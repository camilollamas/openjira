import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const GetFormatDistanceToNow = (date) => {
  const fromNow =  formatDistanceToNow(date, {locale: es });
  return `Hace ${fromNow}`
}


// Path: utils\index.js 