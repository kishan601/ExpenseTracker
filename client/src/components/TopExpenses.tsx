import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Expense } from "../types/expenses";
import { getCategoryData } from "../utils/chartUtils";
import { useTheme } from "../hooks/useTheme";

interface TopExpensesProps {
  expenses: Expense[];
}

const TopExpenses: React.FC<TopExpensesProps> = ({ expenses }) => {
  const { theme } = useTheme();
  const categoryData = getCategoryData(expenses);
  
  const cardBgClass = theme === 'dark'
    ? "bg-gray-700 bg-opacity-70"
    : "bg-white shadow-md";
    
  const progressBgClass = theme === 'dark'
    ? "bg-gray-700"
    : "bg-gray-200";
    
  const emptyTextClass = theme === 'dark'
    ? "text-gray-400"
    : "text-gray-500";

  return (
    <>
      <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Top Expenses
      </h2>
      <Card className={cardBgClass}>
        <CardContent className="p-4">
          <div className="space-y-6">
            {expenses.length === 0 ? (
              <div className={`text-center py-8 ${emptyTextClass}`}>
                No expense data available.
              </div>
            ) : (
              categoryData.slice(0, 3).map(item => (
                <div key={item.category}>
                  <div className="flex justify-between mb-1">
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>
                      {item.category}
                    </span>
                    <span className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div className={`w-full ${progressBgClass} rounded-full h-2.5`}>
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TopExpenses;
