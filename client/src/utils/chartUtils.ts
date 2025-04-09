import { Expense } from "../types/expenses";

export const CATEGORY_COLORS = {
  Food: "hsl(285, 63%, 42%)", // Purple
  Entertainment: "hsl(36, 100%, 50%)", // Orange
  Travel: "hsl(45, 100%, 52%)", // Yellow
  Utilities: "hsl(195, 100%, 50%)", // Blue
  Shopping: "hsl(340, 82%, 52%)", // Pink
  Other: "hsl(160, 64%, 52%)" // Green
};

export const getCategoryData = (expenses: Expense[]) => {
  // Create a map to store totals by category
  const categoryTotals: Record<string, number> = {};
  
  // Calculate total for each category
  expenses.forEach(expense => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.price;
    } else {
      categoryTotals[expense.category] = expense.price;
    }
  });
  
  // Calculate total expense amount
  const totalExpenseAmount = Object.values(categoryTotals).reduce((acc, curr) => acc + curr, 0);
  
  // Prepare data for chart
  const categories = Object.keys(categoryTotals);
  const data = categories.map(category => {
    const percentage = totalExpenseAmount ? Math.round((categoryTotals[category] / totalExpenseAmount) * 100) : 0;
    return {
      category,
      value: categoryTotals[category],
      percentage,
      color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.Other
    };
  });
  
  // Sort by value (highest first)
  return data.sort((a, b) => b.value - a.value);
};
