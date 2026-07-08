import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  const data = await request.formData();
  const consentimiento = data.get('consentimiento'); // 'aceptadas', 'rechazadas', 'personalizadas'

  // Creamos la estructura inicial (las técnicas siempre van en true)
  const preferencias = {
    tecnicas: true,
    analitica: false,
    funcionales: false,
    publicidad: false
  };

  if (consentimiento === 'aceptadas') {
    preferencias.analitica = true;
    preferencias.funcionales = true;
    preferencias.publicidad = true;
  } else if (consentimiento === 'personalizadas') {
    // Si es personalizado, leemos el estado de cada checkbox del formulario
    preferencias.analitica = data.has('analitica');
    preferencias.funcionales = data.has('funcionales');
    preferencias.publicidad = data.has('publicidad');
  }
  // Si es 'rechazadas', se queda todo en false excepto las técnicas

  // Guardamos la decisión final como un texto JSON stringificado
  cookies.set('cookies-consent', JSON.stringify(preferencias), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 año
    httpOnly: false, // Permitir leer desde JS en el cliente si es necesario
    secure: true,
    sameSite: 'lax',
  });

  const paginaAnterior = request.headers.get('referer') || '/';
  return new Response(null, {
    status: 303,
    headers: { Location: paginaAnterior },
  });
};