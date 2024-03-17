export const categoryColors = {
  deficit: "#FFCCCC", // light red
  belowAverage: "#FFEBCC", // light orange
  average: "#FFFFCC", // light yellow
  aboveAverage: "#CCFFCC", // light green
  surplus: "#CCCCFF", // light blue
};

export function classifyNumber(
  balance: number,
  maxAmount: number
): keyof typeof categoryColors {
  const percentage = (balance / maxAmount) * 100;
  if (percentage <= 0) {
    return "deficit";
  } else if (percentage <= 40) {
    return "belowAverage";
  } else if (percentage <= 60) {
    return "average";
  } else if (percentage <= 80) {
    return "aboveAverage";
  } else {
    return "surplus";
  }
}

// "deficit" represents a situation where expenses exceed income.
// "belowAverage" represents a situation where the balance is below the expected or average level.
// "average" represents a situation where the balance is at the expected or average level.
// "aboveAverage" represents a situation where the balance is above the expected or average level.
// "surplus" represents a situation where income exceeds expenses.
