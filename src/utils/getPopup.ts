const WORDPRESS_URL = 'https://gestion.emcosalud.com.co';

export async function getPopupByEntity(entitySlug: string) {
  try {
    // 1. Obtenemos el más reciente de la categoría específica
    const entityRes = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/popups?category_name=${entitySlug}&per_page=1`);
    const entityPopups = entityRes.ok ? await entityRes.json() : [];

    // 2. Obtenemos el más reciente de la categoría general
    const generalRes = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/popups?category_name=general&per_page=1`);
    const generalPopups = generalRes.ok ? await generalRes.json() : [];

    const specificPopup = entityPopups[0] || null;
    const generalPopup = generalPopups[0] || null;

    // Si ambos existen, se compara la fecha de creación/modificación
    if (specificPopup && generalPopup) {
      const specificDate = new Date(specificPopup.date).getTime();
      const generalDate = new Date(generalPopup.date).getTime();

      // Muestra el que haya sido publicado MÁS RECIENTEMENTE
      return generalDate > specificDate ? generalPopup : specificPopup;
    }

    return specificPopup || generalPopup || null;
  } catch (error) {
    console.error(`Error consultando el popup para ${entitySlug}:`, error);
    return null;
  }
}