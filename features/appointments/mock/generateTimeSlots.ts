export function generateTimeSlots(
  start = "10:00",
  end = "12:00",
  interval = 15,
) {
  const slots = [];

  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const formatTime = (minutes: number) => {
    let h = Math.floor(minutes / 60);
    const m = minutes % 60;

    const period = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  let current = toMinutes(start);
  const endMinutes = toMinutes(end);

  let id = 1;

  // أولاً نحسب عدد السلوٹس
  const tempSlots: any[] = [];

  while (current < endMinutes) {
    const next = current + interval;

    tempSlots.push({
      id: id++,
      from: formatTime(current),
      to: formatTime(next),
      label: `${formatTime(current)} - ${formatTime(next)}`,
    });

    current = next;
  }

  // نحسب التلت الأخير
  const thirdStartIndex = Math.floor((tempSlots.length * 2) / 3);

  // نضيف isBooked
  const finalSlots = tempSlots.map((slot, index) => ({
    ...slot,
    isBooked: index >= thirdStartIndex,
  }));

  return finalSlots;
}
