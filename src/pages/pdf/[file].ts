import type { APIRoute } from 'astro';

export const prerender = false; // Asegura ejecución en servidor (SSR)

export const GET: APIRoute = async ({ params }) => {
  const fileName = params.file;
  
  if (!fileName) {
    return new Response('Archivo no especificado', { status: 400 });
  }

  // Reconstruimos la URL hacia la subida original en el subdominio
  const targetUrl = `https://gestion.emcosalud.com.co/wp-content/uploads/${fileName}`;

  try {
    // 1. Fetch simulando un navegador real para evitar bloqueos de LiteSpeed / Firewall
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/pdf,application/xhtml+xml,text/html;q=0.9,*/*;q=0.8',
      },
    });

    // 2. Si el archivo no se encuentra en el subdominio
    if (!response.ok) {
      console.error(`[PDF Proxy Error] Status: ${response.status} URL: ${targetUrl}`);
      return new Response(`Error al obtener el documento (${response.status})`, { status: response.status });
    }

    // 3. Verificamos que contenga un stream/cuerpo válido
    if (!response.body) {
      return new Response('Respuesta vacía del servidor de origen', { status: 500 });
    }

    // 4. Devolvemos el PDF en Stream instantáneo con cabeceras correctas
    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/pdf',
        'Content-Disposition': 'inline', // Para abrir en el navegador, no forzar descarga
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('[PDF Proxy Exception]:', error);
    return new Response(`Error interno de conexión: ${error?.message || 'Error desconocido'}`, { 
      status: 500 
    });
  }
};