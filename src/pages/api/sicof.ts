import type { APIRoute } from 'astro';

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024; // 3 MB máximo

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ message: 'Error de configuración en el servidor.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formData = await request.formData();

    const email = formData.get('email')?.toString() ?? '';
    const situation = formData.get('situation')?.toString() ?? '';
    const description = formData.get('description')?.toString() ?? '';
    const description2 = formData.get('description2')?.toString() ?? '';
    const appointmentDate = formData.get('appointmentDate')?.toString() ?? '';
    const employeenames = formData.get('employeenames')?.toString() ?? '';
    const place = formData.get('place')?.toString() ?? '';
    const incidenttype = formData.get('incidenttype')?.toString() ?? '';
    const registrarDatos = formData.get('registrarDatos')?.toString() ?? 'NO';
    const fullName = formData.get('fullName')?.toString() ?? 'Anónimo';
    const lastName = formData.get('lastName')?.toString() ?? '';
    const phone = formData.get('phone')?.toString() ?? 'No especificado';

    // Manejo opcional de archivo adjunto
    const file = formData.get('records') as File | null;
    const attachments = [];

    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return new Response(
          JSON.stringify({ message: `El archivo adjunto supera el límite de 3 MB.` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const bytes = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(bytes).toString('base64'),
      });
    }

    // Generar identificador único y asunto dinámico para no agrupar hilos de correo
    const ticketId = Math.floor(1000 + Math.random() * 9000);
    const timestamp = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
    const subject = `SICOF #${ticketId}`;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Sistema SICOF <onboarding@resend.dev>', // Cambiar por dominio verificado en prod
        to: ['webmaster@emcosalud.com'], // Cambiar al buzón receptor final
       // cc: ['redes.sociales@emcosalud.com'], // Recibe copia visible del mensaje inicial
        reply_to: email,
        subject,
        headers: {
          'X-Entity-Ref-ID': `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        },
        html: `
          <h2>Nuevo Reporte SICOF (#${ticketId})</h2>
          <hr />
          <p><strong>Tipo de Incidente:</strong> ${incidenttype}</p>
          <p><strong>Fecha en que se detectó:</strong> ${appointmentDate}</p>
          <p><strong>Lugar de los hechos:</strong> ${place}</p>
          <p><strong>Involucrados:</strong> ${employeenames}</p>
          <br />
          <h3>Detalles de la Situación</h3>
          <p><strong>¿Tiempo sucediendo?:</strong> ${situation}</p>
          <p><strong>Descripción de actos indebidos:</strong> ${description}</p>
          <p><strong>¿Cómo se detectó?:</strong> ${description2}</p>
          <br />
          <h3>Datos del Reportante</h3>
          <p><strong>¿Registró datos personales?:</strong> ${registrarDatos}</p>
          <p><strong>Nombre completo:</strong> ${fullName} ${lastName}</p>
          <p><strong>Correo electrónico:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
        `,
        attachments,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      return new Response(
        JSON.stringify({ message: resendData.message || 'Error al procesar el envío de correo.' }),
        { status: resendResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Reporte registrado exitosamente.', id: resendData.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ message: err.message || 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};