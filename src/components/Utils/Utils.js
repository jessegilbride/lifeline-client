import { format as formatDate } from 'date-fns';
import './Utils.css';

export function NiceDate({ date, format='YYYY-MM-DD' }) {
  return formatDate(date, format)
};
