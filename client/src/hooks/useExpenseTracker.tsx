import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Expense, ExpenseTrackerState } from "../types/expenses";

// Initial state
const DEFAULT_BALANCE = 5000;
const INITIAL_STATE: ExpenseTrackerState = {
  walletBalance: DEFAULT_BALANCE,
  expenses: [],
  totalExpenses: 0
};

// LocalStorage keys
const STATE_KEY = 'expenseTrackerState';
const EXPENSES_KEY = 'expenses';

export const useExpenseTracker = () => {
  const { toast } = useToast();
  const [state, setState] = useState<ExpenseTrackerState>(INITIAL_STATE);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 3;

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem(STATE_KEY);
    const savedExpenses = localStorage.getItem(EXPENSES_KEY);
    
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState) as ExpenseTrackerState;
        setState(parsedState);
      } catch (error) {
        console.error("Failed to parse saved state:", error);
      }
    } else if (savedExpenses) {
      try {
        const parsedExpenses = JSON.parse(savedExpenses) as Expense[];
        const totalExpenses = parsedExpenses.reduce((sum, expense) => sum + expense.price, 0);
        
        setState({
          walletBalance: DEFAULT_BALANCE - totalExpenses,
          expenses: parsedExpenses,
          totalExpenses
        });
      } catch (error) {
        console.error("Failed to parse saved expenses:", error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(state.expenses));
  }, [state]);

  // Add income
  const addIncome = (amount: number) => {
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a positive amount",
        variant: "destructive"
      });
      return;
    }

    setState(prevState => ({
      ...prevState,
      walletBalance: prevState.walletBalance + amount
    }));

    toast({
      title: "Income Added",
      description: `Added ${amount} to your wallet balance.`,
      variant: "default"
    });
    
    setShowIncomeModal(false);
  };

  // Add expense
  const addExpense = (expense: Omit<Expense, "id">) => {
    const { price } = expense;
    
    if (price <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a positive amount",
        variant: "destructive"
      });
      return false;
    }
    
    if (price > state.walletBalance) {
      toast({
        title: "Insufficient Balance",
        description: "Expense amount exceeds wallet balance!",
        variant: "destructive"
      });
      return false;
    }

    const newExpense = {
      ...expense,
      id: Date.now()
    };

    setState(prevState => ({
      walletBalance: prevState.walletBalance - price,
      expenses: [newExpense, ...prevState.expenses],
      totalExpenses: prevState.totalExpenses + price
    }));

    toast({
      title: "Expense Added",
      description: `Added ${expense.title} to your expenses.`,
      variant: "default"
    });
    
    setShowExpenseModal(false);
    return true;
  };

  // Delete expense
  const deleteExpense = (id: number) => {
    const expenseToDelete = state.expenses.find(expense => expense.id === id);
    
    if (!expenseToDelete) return;
    
    setState(prevState => ({
      walletBalance: prevState.walletBalance + expenseToDelete.price,
      expenses: prevState.expenses.filter(expense => expense.id !== id),
      totalExpenses: prevState.totalExpenses - expenseToDelete.price
    }));

    toast({
      title: "Expense Deleted",
      description: `Deleted ${expenseToDelete.title} from your expenses.`,
      variant: "default"
    });
  };

  // Edit expense
  const editExpense = (updatedExpense: Expense) => {
    const oldExpense = state.expenses.find(expense => expense.id === updatedExpense.id);
    
    if (!oldExpense) return false;
    
    const priceDifference = updatedExpense.price - oldExpense.price;
    
    if (priceDifference > state.walletBalance) {
      toast({
        title: "Insufficient Balance",
        description: "New expense amount exceeds wallet balance!",
        variant: "destructive"
      });
      return false;
    }

    setState(prevState => ({
      walletBalance: prevState.walletBalance - priceDifference,
      expenses: prevState.expenses.map(expense => 
        expense.id === updatedExpense.id ? updatedExpense : expense
      ),
      totalExpenses: prevState.totalExpenses + priceDifference
    }));

    toast({
      title: "Expense Updated",
      description: `Updated ${updatedExpense.title} in your expenses.`,
      variant: "default"
    });
    
    setShowEditModal(false);
    setEditingExpense(null);
    return true;
  };

  // Start editing an expense
  const startEditingExpense = (id: number) => {
    const expense = state.expenses.find(expense => expense.id === id);
    if (expense) {
      setEditingExpense(expense);
      setShowEditModal(true);
    }
  };

  // Pagination
  const totalPages = Math.ceil(state.expenses.length / expensesPerPage);
  const paginatedExpenses = state.expenses.slice(
    (currentPage - 1) * expensesPerPage,
    currentPage * expensesPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    state,
    paginatedExpenses,
    currentPage,
    totalPages,
    showIncomeModal,
    showExpenseModal,
    showEditModal,
    editingExpense,
    setShowIncomeModal,
    setShowExpenseModal,
    setShowEditModal,
    addIncome,
    addExpense,
    deleteExpense,
    editExpense,
    startEditingExpense,
    goToNextPage,
    goToPreviousPage
  };
};
