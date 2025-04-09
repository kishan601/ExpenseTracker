import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { Expense } from "../types/expenses";
import { getIconForCategory } from "../utils/getIconForCategory";
import { useTheme } from "../hooks/useTheme";

interface RecentTransactionsProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  expenses,
  onDelete,
  onEdit,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage
}) => {
  const { theme } = useTheme();
  
  const cardBgClass = theme === 'dark'
    ? "bg-gray-700 bg-opacity-70"
    : "bg-white shadow-md";
    
  const borderClass = theme === 'dark'
    ? "border-gray-700"
    : "border-gray-200";
    
  const iconBgClass = theme === 'dark'
    ? "bg-gray-600"
    : "bg-gray-200";
    
  const emptyTextClass = theme === 'dark'
    ? "text-gray-400"
    : "text-gray-500";
    
  const dateTextClass = theme === 'dark'
    ? "text-gray-400"
    : "text-gray-500";
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <>
      <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Recent Transactions
      </h2>
      <Card className={cardBgClass}>
        <CardContent className="p-4">
          <div className="space-y-4">
            {expenses.length === 0 ? (
              <div className={`text-center py-8 ${emptyTextClass}`}>
                No transactions yet. Add an expense to get started.
              </div>
            ) : (
              expenses.map(expense => (
                <div key={expense.id} className={`border-b ${borderClass} pb-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`${iconBgClass} rounded-full w-10 h-10 flex items-center justify-center mr-3`}>
                        {getIconForCategory(expense.category)}
                      </div>
                      <div>
                        <div className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                          {expense.title}
                        </div>
                        <div className={`${dateTextClass} text-sm`}>
                          {formatDate(expense.date)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-orange-500 mr-4 font-medium">
                        {formatCurrency(expense.price)}
                      </span>
                      <Button
                        className="bg-red-500 text-white rounded-full w-8 h-8 p-0 mr-2 hover:bg-opacity-90 transition-all"
                        onClick={() => onDelete(expense.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        className="bg-yellow-500 text-white rounded-full w-8 h-8 p-0 hover:bg-opacity-90 transition-all"
                        onClick={() => onEdit(expense.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Button
                className="bg-gray-700 hover:bg-gray-600 text-white rounded-l-md w-10 h-10 p-0"
                onClick={onPrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                className="bg-green-500 text-white w-10 h-10 p-0"
                disabled
              >
                {currentPage}
              </Button>
              <Button
                className="bg-gray-700 hover:bg-gray-600 text-white rounded-r-md w-10 h-10 p-0"
                onClick={onNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default RecentTransactions;
