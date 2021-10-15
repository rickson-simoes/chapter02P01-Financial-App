import { useEffect, useState } from "react";
import { Container } from "./styles";

import { api } from '../../services/api';

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

export function TransactionsTable(){
  const [transactions, setTransactions] = useState<ITransactions[]>([]);

  useEffect(() => {
    api.get<ITransactions[]>("transactions")
      .then(({ data }) => {
        const { transactions } = data as unknown as ITransactionsObj;

        setTransactions(transactions);
      });
  },[]);


  
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>

              <td className={transaction.type}> 
                R$ {transaction.type === 'withdraw' 
                ? `- ${transaction.value}`
                : transaction.value}
              </td>

              <td>{transaction.category}</td>

              <td>{transaction.createdAt.substring(0,10).split('-').reverse().join('/')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}