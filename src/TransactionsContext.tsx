import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface ITransactions {
  id: number;
  title: string;
  value: number;
  type: "deposit" | "withdraw";
  category: string;
  createdAt: string;
}

interface ITransactionsObj {
transactions: ITransactions[];
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<ITransactions[]>([]);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  
  useEffect(() => {
    api.get<ITransactions[]>("transactions")
    .then(({ data }) => {
      const { transactions } = data as unknown as ITransactionsObj;
      
      setTransactions(transactions);
    });
  },[]);
  
  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
}