import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Mapeo de destinatarios según la sede seleccionada
export const EMAILS_POR_SEDE: Record<string, string> = {
  // Sedes Huila
  'NEIVA': 'callcentertolihuila7@gmail.com',
  'NEIVA IMAGENOLOGÍA': 'recepcion.clinica@emcosalud.com', 
  'NEIVA TERAPIAS': 'citas.huila@emcosalud.com', 
  'GUADALUPE': 'guadalupe@emcosalud.com', 
  'CAMPOALEGRE': 'emcosalud.farmacia.campoalegre@gmail.com', 
  'SAN AGUSTIN': 'emcosalud.farmacia.sanagustin@gmail.com', 
  'GIGANTE': 'care.gigante@gmail.com', 
  'LA PLATA': 'laplata@emcosalud.com', 
  'GARZÓN': 'garzon@emcosalud.com', 
  'PITALITO': 'pitalito@emcosalud.com',
  
  // Sedes Tolima
  'IBAGUE': 'citas.tolima@emcosalud.com', 
  'ESPINAL': 'espinal@emcosalud.com', 
  'CHAPARRAL': 'chaparral@emcosalud.com',
  'LÍBANO': 'sede.libano@emcosalud.com', 
  'FRESNO': 'sede.fresno@emcosalud.com', 
  'MARIQUITA': 'mariquita@emcosalud.com', 
  'ORTEGA': 'sede.ortega@emcosalud.com', 
  'HONDA': 'sede.honda@emcosalud.com',

  // Correo de respaldo si no coincide ninguna sede
  'default': 'redes.sociales@emcosalud.com',
};

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // 1. Extraer todos los campos del formulario
    const fullName = formData.get('fullName')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const documentType = formData.get('documentType')?.toString() ?? '';
    const documentNumber = formData.get('documentNumber')?.toString() ?? '';
    const address = formData.get('address')?.toString() ?? '';
    const phone = formData.get('phone')?.toString() ?? '';
    const appointmentDate = formData.get('appointmentDate')?.toString() ?? '';
    const jornada = formData.get('jornada')?.toString() ?? '';
    const sede = formData.get('sede')?.toString() ?? '';
    const service = formData.get('service')?.toString() ?? '';
    const medico = formData.get('medico')?.toString() ?? '';
    const department = formData.get('department')?.toString() ?? '';

    // Campos condicionales y adicionales
    const nursingDescription = formData.get('nursingDescription')?.toString() ?? '';
    const consultavida = formData.get('consultavida')?.toString() ?? '';
    const serviceginecologia = formData.get('serviceginecologia')?.toString() ?? '';
    const servicePediatria = formData.get('servicePediatria')?.toString() ?? '';
    const serviceDescription = formData.get('serviceDescription')?.toString() ?? '';

    // 2. Validación básica
    if (!fullName || !email || !documentNumber || !phone || !sede || !service) {
      return new Response(
        JSON.stringify({ message: 'Faltan campos obligatorios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Obtener el correo destino según la sede
    const correoDestino = EMAILS_POR_SEDE[sede] || EMAILS_POR_SEDE['default'];

    // 4. Procesar adjuntos para Resend
    const ordenFomag = formData.get('ordenFomag') as File | null;
    const ordenMedica = formData.get('ordenMedica') as File | null;

    const attachments = [];

    if (ordenFomag && ordenFomag.size > 0) {
      const bytes = await ordenFomag.arrayBuffer();
      attachments.push({
        filename: ordenFomag.name,
        content: Buffer.from(bytes),
      });
    }

    if (ordenMedica && ordenMedica.size > 0) {
      const bytes = await ordenMedica.arrayBuffer();
      attachments.push({
        filename: ordenMedica.name,
        content: Buffer.from(bytes),
      });
    }

    // 5. Construir detalle de la consulta según el servicio elegido
    let detalleServicioHTML = '';
    if (nursingDescription) detalleServicioHTML += `<p><strong>Detalle Enfermería:</strong> ${nursingDescription}</p>`;
    if (consultavida) detalleServicioHTML += `<p><strong>Consulta por:</strong> ${consultavida}</p>`;
    if (serviceginecologia) detalleServicioHTML += `<p><strong>Detalle Ginecología:</strong> ${serviceginecologia}</p>`;
    if (servicePediatria) detalleServicioHTML += `<p><strong>Detalle Pediatría:</strong> ${servicePediatria}</p>`;

    // 6. Enviar correo a la sede correspondiente
    await resend.emails.send({
      from: 'AGENDAMIENTO DE CITA PAGÍNA WEB <onboarding@resend.dev>',
      to: ['webmaster@emcosalud.com'],
     // cc: ['redes.sociales@emcosalud.com'], // Recibe copia visible del mensaje inicial
      replyTo: email,
      subject: `Nueva Solicitud Cita [${sede}] - ${fullName}`,
      html: `
        <h2>Solicitud de Cita Médica (${department.toUpperCase()})</h2>
        <hr />
        <p><strong>Paciente:</strong> ${fullName}</p>
        <p><strong>Documento:</strong> ${documentType} ${documentNumber}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Dirección:</strong> ${address}</p>
        <p><strong>Correo Paciente:</strong> ${email}</p>
        <hr />
        <p><strong>Sede:</strong> ${sede}</p>
        <p><strong>Servicio:</strong> ${service}</p>
        <p><strong>Fecha Solicitada:</strong> ${appointmentDate} Jornada (${jornada})</p>
        ${detalleServicioHTML}
        <p><strong>Médico:</strong> ${medico || 'No especificado'}</p>
        <p><strong>Observaciones:</strong> ${serviceDescription || 'Sin observaciones'}</p>
      `,
      attachments,
    });

    // 7. Responder al cliente
    return new Response(
      JSON.stringify({ message: 'Solicitud procesada con éxito' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al procesar la cita:', error);
    return new Response(
      JSON.stringify({ message: 'Error interno del servidor al procesar la cita' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};