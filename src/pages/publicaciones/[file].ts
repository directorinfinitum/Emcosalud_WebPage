import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  // Catch-all [...file] captura la ruta como array o string según Astro
  const rawPath = params.file;

  if (!rawPath) {
    return new Response('Archivo no especificado', { status: 400 });
  }

  // Si la ruta viene dividida como array, la unimos con slashes
  const filePath = Array.isArray(rawPath) ? rawPath.join('/') : rawPath;

  // Reconstruimos la URL original exacta
  const targetUrl = `https://gestion.emcosalud.com.co/wp-content/uploads/${filePath}`;

  // Log para revisar en la consola de la terminal exactamente qué intenta descargar
  console.log(`[Proxy Publicaciones] Solicitando: ${targetUrl}`);

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,application/pdf,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      console.error(`[Proxy Publicaciones Error 404] No existe la URL: ${targetUrl}`);
      return new Response(`Archivo no encontrado en el origen (HTTP ${response.status})`, { status: response.status });
    }

    if (!response.body) {
      return new Response('El archivo recuperado está vacío', { status: 500 });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    console.error('[Proxy Publicaciones Exception]:', error);
    return new Response(`Error interno del servidor: ${error?.message || ''}`, { status: 500 });
  }
};