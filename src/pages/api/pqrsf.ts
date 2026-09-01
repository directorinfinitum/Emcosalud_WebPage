import type { APIRoute } from 'astro';
import { Buffer } from 'node:buffer'; // Importación explícita para evitar fallos de ejecución

// Forzar a Astro a tratar esta ruta como un endpoint dinámico (evita el 404 en SSG/Híbrido)
export const prerender = false;

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024; // 3 MB máximo

export const POST: APIRoute = async ({ request }) => {
  try {
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ message: 'Error de configuración: Faltan las llaves de API.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formData = await request.formData();

    const fullName = formData.get('fullName')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const address = formData.get('address')?.toString() ?? '';
    const phone = formData.get('phone')?.toString() ?? '';
    const document = formData.get('document')?.toString() ?? '';
    const NumDoc = formData.get('NumDoc')?.toString() ?? '';
    const department = formData.get('department')?.toString() ?? '';
    const sedeshuila = formData.get('sedeshuila')?.toString() ?? '';
    const sedestolima = formData.get('sedestolima')?.toString() ?? '';
    const description = formData.get('description')?.toString() ?? '';

    // Determinar sede seleccionada
    const sede = department === 'HUILA' ? sedeshuila : department === 'TOLIMA' ? sedestolima : 'No especificada';

    // Manejo de archivo adjunto
    const file = formData.get('records') as File | null;
    const attachments = [];

    if (file && file.size > 0 && file.name !== 'undefined') {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return new Response(
          JSON.stringify({ message: 'El archivo adjunto supera el límite permitido (3 MB).' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const arrayBuffer = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(arrayBuffer).toString('base64'),
      });
    }

    // Identificador único de radicado
    const ticketId = Math.floor(100000 + Math.random() * 900000); // Se amplió a 6 dígitos
    const timestamp = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });
    const subject = `PQRSF #${ticketId}`;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Sistema PQRSF <onboarding@resend.dev>',
        to: ['webmaster@emcosalud.com'],
        // cc: ['redes.sociales@emcosalud.com'],
        reply_to: email,
        subject,
        headers: {
          'X-Entity-Ref-ID': `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        },
        html: `
          <h2>Nueva Solicitud PQRSF (#${ticketId})</h2>
          <hr />
          <h3>Datos del Usuario</h3>
          <p><strong>Nombre completo:</strong> ${fullName}</p>
          <p><strong>Documento:</strong> ${document} ${NumDoc}</p>
          <p><strong>Correo electrónico:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Dirección:</strong> ${address}</p>
          <br />
          <h3>Ubicación y Sede</h3>
          <p><strong>Departamento:</strong> ${department}</p>
          <p><strong>Sede seleccionada:</strong> ${sede}</p>
          <br />
          <h3>Detalle de la Solicitud</h3>
          <p><strong>Descripción:</strong></p>
          <p style="background-color: #f8fafc; padding: 12px; border-radius: 8px;">${description}</p>
        `,
        attachments,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      return new Response(
        JSON.stringify({ message: resendData.message || 'Error al procesar el correo en Resend.' }),
        { status: resendResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'PQRSF registrada exitosamente.', id: resendData.id, ticketId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ message: err.message || 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};