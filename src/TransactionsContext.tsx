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

type ITransactionInput = Omit<ITransactions, 'id' | 'createdAt'>;

interface ITransactionsContextData {
  transactions: ITransactions[],
  createTransaction: (transaction : ITransactionInput) => Promise<void>;
}

// type ITransactionInput = Pick<ITransactions, 'title' | 'type' | 'value' | 'category'>;

export const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
    
  useEffect(() => {
    api.get<ITransactions[]>("transactions")
    .then(({ data }) => {
      const  { transactions } = data as unknown as ITransactionsObj;
      
      setTransactions(transactions);
    });
  },[]);

  async function createTransaction(transactionInput: ITransactionInput) {
    // const response = await api.post('/transactions', {
    //  ...transactionInput,
    //  createdAt: new Date()
    // });
    
    const response = await api.post('/transactions', transactionInput);
    const { transaction } = response.data as any;

    Object.assign(transaction, {
      createdAt: new Date()
    })

    setTransactions([
      ...transactions,
      transaction
    ] as ITransactions[]);
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
}