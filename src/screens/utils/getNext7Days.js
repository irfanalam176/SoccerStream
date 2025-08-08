export const getNext7Days = () => {
  const today = new Date();
  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    days.push({
      label: date.toLocaleString('default', { weekday: 'short' }),
      date: date.getDate(),
      fullDate: date,
      active: i === 0, // mark today as active
    });
  }

  return days;
};