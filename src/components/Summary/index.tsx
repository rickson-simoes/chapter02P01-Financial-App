import { useContext } from 'react';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from '../../TransactionsContext';

import { Container } from "./styles";

// function Teste(){
//   return (
//     <TransactionsContext.Consumer>
//       {(data) => {
//         console.log(data)
//         return <span hidden>a</span>
//       }}
//     </TransactionsContext.Consumer>
//   )
// }

export function Summary() { 
  const { transactions } = useContext(TransactionsContext);

  const income = transactions.filter(transactions => transactions.type === "deposit").reduce((acc , transaction) => {
    return acc + transaction.value 
  }, 0);

  const outcome = transactions.filter(transactions => transactions.type === "withdraw").reduce((acc , transaction) => {
    return acc + transaction.value 
  }, 0);

  const total = income - outcome;

  function repairValue(val: number){
    return Intl.NumberFormat('pt-BR', {currency: 'BRL', style: "currency"}).format(val);
  }

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>

        <strong>{repairValue(income)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>

        <strong>{repairValue(outcome)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>

        <strong>{repairValue(total)}</strong>
      </div>
    </Container>
  )
}