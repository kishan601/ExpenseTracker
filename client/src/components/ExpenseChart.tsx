import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Expense } from "../types/expenses";
import { getCategoryData, CATEGORY_COLORS } from "../utils/chartUtils";
import Chart from "chart.js/auto";
import { useTheme } from "../hooks/useTheme";

interface ExpenseChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const { theme } = useTheme();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Get category data
      const categoryData = getCategoryData(expenses);
      
      // If no expenses, show empty chart
      if (categoryData.length === 0) {
        categoryData.push({
          category: "No Data",
          value: 1,
          percentage: 100,
          color: "hsl(0, 0%, 60%)"
        });
      }

      // Create chart with theme-specific colors
      const textColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
      
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: categoryData.map(item => item.category),
          datasets: [{
            data: categoryData.map(item => item.percentage),
            backgroundColor: categoryData.map(item => item.color),
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
              labels: {
                color: textColor
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw}%`;
                }
              },
              backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              titleColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
              bodyColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
              padding: 10,
              cornerRadius: 5
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses, theme]); // Also update when theme changes

  // Only show legend for categories that have data
  const legendItems = getCategoryData(expenses).slice(0, 3);
  
  const cardBgClass = theme === 'dark'
    ? "bg-gray-700 bg-opacity-70"
    : "bg-white shadow-md";

  return (
    <Card className={cardBgClass}>
      <CardContent className="p-4 flex justify-center items-center relative">
        <canvas ref={chartRef} width="200" height="200"></canvas>
        
        {expenses.length > 0 && (
          <div className="absolute bottom-2 right-2 flex gap-2">
            {legendItems.map(item => (
              <div key={item.category} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-1" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                  {item.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
