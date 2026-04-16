/**
 * Función para formatear URLs de Google Drive a formato thumbnail
 * Convierte URLs de Google Drive al formato optimizado para mostrar imágenes
 * 
 * @param {string} url - URL de Google Drive
 * @returns {string} - URL formateada para thumbnail o URL original si no es de Google Drive
 */
const formatGoogleDriveUrl = (url) => {
  if (!url) return '';
  
  let fileId = '';
  
  // Buscar el ID en URLs tipo: https://drive.google.com/file/d/FILE_ID/view
  const fileIdMatch = url.match(/\/d\/(.*?)(\/|$|\?)/);
  if (fileIdMatch) {
    fileId = fileIdMatch[1];
  }
  
  // Buscar el ID en URLs tipo: https://drive.google.com/uc?id=FILE_ID
  const ucMatch = url.match(/id=(.*?)($|&)/);
  if (ucMatch) {
    fileId = ucMatch[1];
  }
  
  // Si no se encontró un ID, devolver la URL original
  if (!fileId) return url;
  
  // Retornar URL formateada para thumbnail con tamaño w1000
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
};

export default formatGoogleDriveUrl;


