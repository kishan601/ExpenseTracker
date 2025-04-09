import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Expense } from "../types/expenses";
import { useTheme } from "../hooks/useTheme";

interface EditExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
  onEditExpense: (expense: Expense) => boolean;
}

const CATEGORIES = ["Food", "Entertainment", "Travel", "Utilities", "Shopping", "Other"];

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  price: z.string()
    .refine(val => !isNaN(Number(val)), {
      message: "Price must be a valid number",
    })
    .refine(val => Number(val) > 0, {
      message: "Price must be greater than 0",
    }),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
});

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({ isOpen, onClose, expense, onEditExpense }) => {
  const { theme } = useTheme();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: expense?.id || 0,
      title: expense?.title || "",
      price: expense?.price?.toString() || "",
      category: expense?.category || "",
      date: expense?.date || "",
    },
  });

  // Update form when expense changes
  useEffect(() => {
    if (expense) {
      form.reset({
        id: expense.id,
        title: expense.title,
        price: expense.price.toString(),
        category: expense.category,
        date: expense.date,
      });
    }
  }, [expense, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const success = onEditExpense({
      id: values.id,
      title: values.title,
      price: Number(values.price),
      category: values.category,
      date: values.date,
    });
    
    if (success) {
      form.reset();
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const modalBgClass = theme === 'dark'
    ? "bg-gray-800 text-gray-100"
    : "bg-white text-gray-800";
    
  const inputBorderClass = theme === 'dark'
    ? "border-gray-600 bg-gray-700 text-gray-100"
    : "border-gray-300 bg-white text-gray-800";
    
  const selectTriggerClass = theme === 'dark'
    ? "border-gray-600 bg-gray-700 text-gray-300"
    : "border-gray-300 bg-white text-gray-500";
    
  const cancelButtonClass = theme === 'dark'
    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
    : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${modalBgClass} sm:max-w-md`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Expense</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <input type="hidden" {...form.register("id")} />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        type="text"
                        id="editTitle"
                        placeholder="Title"
                        className={`w-full p-3 border rounded-md ${inputBorderClass}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        type="number"
                        id="editPrice"
                        placeholder="Price"
                        className={`w-full p-3 border rounded-md ${inputBorderClass}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger id="editCategory" className={`w-full p-3 border rounded-md ${selectTriggerClass}`}>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent className={theme === 'dark' ? 'bg-gray-800 text-gray-100' : ''}>
                          {CATEGORIES.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormControl>
                      <Input
                        type="date"
                        id="editDate"
                        className={`w-full p-3 border rounded-md ${inputBorderClass}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-between mt-2">
              <Button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Update Expense
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className={`px-4 py-2 rounded-md ${cancelButtonClass}`}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditExpenseModal;
