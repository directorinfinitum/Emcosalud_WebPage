import type { APIRoute } from 'astro';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

// Límite máximo de payload recomendado para evitar cierres de socket TLS
const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024; // 3 MB por archivo
const MAX_TOTAL_SIZE_BYTES = 6 * 1024 * 1024; // 6 MB total combinados

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ message: 'Error de configuración: Falta RESEND_API_KEY en el servidor.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formData = await request.formData();

    const firstName = formData.get('firstName')?.toString() ?? '';
    const lastName = formData.get('lastName')?.toString() ?? '';
    const documentType = formData.get('documentType')?.toString() ?? '';
    const documentNumber = formData.get('documentNumber')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const phone = formData.get('phone')?.toString() ?? '';
    const phoneAlt = formData.get('phoneAlt')?.toString() ?? '';

    const fileKeys = ['documentsPdf', 'medicalOrder', 'serviceFormat'];
    let totalSizeBytes = 0;
    const attachments = [];

    // Validar peso de adjuntos antes de procesar
    for (const key of fileKeys) {
      const file = formData.get(key) as File | null;
      if (file && file.size > 0) {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          return new Response(
            JSON.stringify({
              message: `El archivo "${file.name}" supera el límite de 3 MB. Por favor compátelo o redúcelo de tamaño.`,
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }

        totalSizeBytes += file.size;
        const bytes = await file.arrayBuffer();
        attachments.push({
          filename: file.name,
          content: Buffer.from(bytes).toString('base64'),
        });
      }
    }

    if (totalSizeBytes > MAX_TOTAL_SIZE_BYTES) {
      return new Response(
        JSON.stringify({
          message: 'El tamaño total de los 3 archivos supera los 6 MB. Reduce el peso de los documentos antes de enviar.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Petición fetch a Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Sistema SOAT <onboarding@resend.dev>', // Ajustar a tu dominio verificado en producción
        to: ['webmaster@emcosalud.com'], // Ajustar a tu correo de pruebas
      //  cc: ['redes.sociales@emcosalud.com'], // Recibe copia visible del mensaje inicial
        reply_to: email,
        subject: `Nueva Solicitud SOAT - ${firstName} ${lastName}`,
        html: `
          <h2>Nueva Solicitud de Cita / Trámite SOAT</h2>
          <hr />
          <p><strong>Solicitante:</strong> ${firstName} ${lastName}</p>
          <p><strong>Documento:</strong> ${documentType} ${documentNumber}</p>
          <p><strong>Correo electrónico:</strong> ${email}</p>
          <p><strong>Teléfono principal:</strong> ${phone}</p>
          <p><strong>Teléfono alternativo:</strong> ${phoneAlt || 'No registrado'}</p>
        `,
        attachments,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Error devuelto por la API de Resend:', resendData);
      return new Response(
        JSON.stringify({ message: resendData.message || 'Error al procesar la solicitud en el servidor de correo.' }),
        { status: resendResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Solicitud enviada con éxito', id: resendData.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Error de conexión/red en endpoint SOAT:', err);
    return new Response(
      JSON.stringify({
        message: 'Falla de conexión con el servidor de correos. Verifica tu conexión a internet o el tamaño de los adjuntos.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};