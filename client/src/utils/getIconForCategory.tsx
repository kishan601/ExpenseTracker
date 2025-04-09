import React from "react";
import { 
  Utensils, Film, Car, Home, ShoppingBag, Package 
} from "lucide-react";

export const getIconForCategory = (category: string) => {
  switch (category) {
    case "Food":
      return <Utensils className="text-white" />;
    case "Entertainment":
      return <Film className="text-white" />;
    case "Travel":
      return <Car className="text-white" />;
    case "Utilities":
      return <Home className="text-white" />;
    case "Shopping":
      return <ShoppingBag className="text-white" />;
    default:
      return <Package className="text-white" />;
  }
};
