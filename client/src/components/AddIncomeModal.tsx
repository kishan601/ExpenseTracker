import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useTheme } from "../hooks/useTheme";

interface AddIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIncome: (amount: number) => void;
}

const formSchema = z.object({
  incomeAmount: z.string()
    .refine(val => !isNaN(Number(val)), {
      message: "Amount must be a valid number",
    })
    .refine(val => Number(val) > 0, {
      message: "Amount must be greater than 0",
    })
});

const AddIncomeModal: React.FC<AddIncomeModalProps> = ({ isOpen, onClose, onAddIncome }) => {
  const { theme } = useTheme();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incomeAmount: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddIncome(Number(values.incomeAmount));
    form.reset();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const modalBgClass = theme === 'dark'
    ? "bg-gray-800 text-gray-100"
    : "bg-white text-gray-800";
    
  const labelClass = theme === 'dark'
    ? "text-sm font-medium text-gray-300"
    : "text-sm font-medium text-gray-700";
    
  const inputBorderClass = theme === 'dark'
    ? "border-gray-600 bg-gray-700 text-gray-100"
    : "border-gray-300 bg-white text-gray-800";
    
  const cancelButtonClass = theme === 'dark'
    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
    : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={`${modalBgClass} sm:max-w-md`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Income</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="incomeAmount"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="incomeAmount" className={labelClass}>
                    Income Amount
                  </Label>
                  <FormControl>
                    <Input
                      type="number"
                      id="incomeAmount"
                      placeholder="Income Amount"
                      className={`w-full p-3 border rounded-md ${inputBorderClass}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className={`px-4 py-2 rounded-md ${cancelButtonClass}`}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Balance
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddIncomeModal;
