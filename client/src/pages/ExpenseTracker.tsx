import React from "react";
import WalletCard from "../components/WalletCard";
import ExpensesCard from "../components/ExpensesCard";
import ExpenseChart from "../components/ExpenseChart";
import RecentTransactions from "../components/RecentTransactions";
import TopExpenses from "../components/TopExpenses";
import AddIncomeModal from "../components/AddIncomeModal";
import AddExpenseModal from "../components/AddExpenseModal";
import EditExpenseModal from "../components/EditExpenseModal";
import ThemeToggle from "../components/ThemeToggle";
import { useExpenseTracker } from "../hooks/useExpenseTracker";
import { useTheme } from "../hooks/useTheme";

const ExpenseTracker: React.FC = () => {
  const { theme } = useTheme();
  const {
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
  } = useExpenseTracker();

  const bgClass = theme === 'dark' 
    ? "bg-gray-900 text-gray-100" 
    : "bg-gray-100 text-gray-800";
  
  const cardBgClass = theme === 'dark'
    ? "bg-gray-800 bg-opacity-70"
    : "bg-white shadow";

  const headerTextClass = theme === 'dark'
    ? "text-white"
    : "text-gray-800";

  return (
    <div className={`${bgClass} min-h-screen p-4 transition-colors duration-200`}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${headerTextClass}`}>Expense Tracker</h1>
          <ThemeToggle />
        </div>
        
        {/* Main Dashboard */}
        <div className={`${cardBgClass} rounded-lg p-4 mb-6 transition-colors duration-200`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Wallet Card */}
            <WalletCard 
              balance={state.walletBalance} 
              onAddIncomeClick={() => setShowIncomeModal(true)} 
            />
            
            {/* Expenses Card */}
            <ExpensesCard 
              totalExpenses={state.totalExpenses} 
              onAddExpenseClick={() => setShowExpenseModal(true)} 
            />
            
            {/* Expense Chart */}
            <ExpenseChart expenses={state.expenses} />
          </div>
        </div>
        
        {/* Transactions and Trends Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Transactions Column */}
          <div className="md:col-span-3">
            <RecentTransactions 
              expenses={paginatedExpenses}
              onDelete={deleteExpense}
              onEdit={startEditingExpense}
              currentPage={currentPage}
              totalPages={totalPages}
              onNextPage={goToNextPage}
              onPrevPage={goToPreviousPage}
            />
          </div>
          
          {/* Trends Column */}
          <div className="md:col-span-2">
            <TopExpenses expenses={state.expenses} />
          </div>
        </div>
        
        {/* Modals */}
        <AddIncomeModal 
          isOpen={showIncomeModal}
          onClose={() => setShowIncomeModal(false)}
          onAddIncome={addIncome}
        />
        
        <AddExpenseModal 
          isOpen={showExpenseModal}
          onClose={() => setShowExpenseModal(false)}
          onAddExpense={addExpense}
        />
        
        <EditExpenseModal 
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          expense={editingExpense}
          onEditExpense={editExpense}
        />
      </div>
    </div>
  );
};

export default ExpenseTracker;
