import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "../utils/formatCurrency";
import { useTheme } from "../hooks/useTheme";

interface WalletCardProps {
  balance: number;
  onAddIncomeClick: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ balance, onAddIncomeClick }) => {
  const { theme } = useTheme();
  
  const cardBgClass = theme === 'dark'
    ? "bg-gray-700 bg-opacity-70"
    : "bg-white shadow-md";
  
  return (
    <Card className={cardBgClass}>
      <CardContent className="p-6 flex flex-col">
        <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
          Wallet Balance:{" "}
          <span className="text-green-500">{formatCurrency(balance)}</span>
        </h2>
        <Button 
          type="button" 
          className="bg-green-500 text-white rounded-full py-2 px-4 mt-2 w-36 hover:bg-opacity-90 transition-all"
          onClick={onAddIncomeClick}
        >
          + Add Income
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
