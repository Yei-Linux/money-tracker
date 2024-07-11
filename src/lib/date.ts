export const firstDayOfMonth = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${year}-${month}-01T00:00:00.000Z`;
};
