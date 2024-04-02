const currentDate = new Date();
export const startOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  1
);
startOfMonth.setHours(0, 0, 0, 0);

export const endOfMonth = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 1,
  0
);
endOfMonth.setHours(23, 59, 59, 999);
