import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "../utils/formatCurrency";
import { useTheme } from "../hooks/useTheme";

interface ExpensesCardProps {
  totalExpenses: number;
  onAddExpenseClick: () => void;
}

const ExpensesCard: React.FC<ExpensesCardProps> = ({ totalExpenses, onAddExpenseClick }) => {
  const { theme } = useTheme();
  
  const cardBgClass = theme === 'dark'
    ? "bg-gray-700 bg-opacity-70"
    : "bg-white shadow-md";
  
  return (
    <Card className={cardBgClass}>
      <CardContent className="p-6 flex flex-col">
        <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
          Expenses:{" "}
          <span className="text-orange-500">{formatCurrency(totalExpenses)}</span>
        </h2>
        <Button 
          type="button" 
          className="bg-red-500 text-white rounded-full py-2 px-4 mt-2 w-36 hover:bg-opacity-90 transition-all"
          onClick={onAddExpenseClick}
        >
          + Add Expense
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExpensesCard;
