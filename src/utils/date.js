export default function formatDate(value) {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  return date.toLocaleString(['en-US'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}
