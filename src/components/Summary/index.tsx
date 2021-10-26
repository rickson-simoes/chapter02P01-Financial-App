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

interface ISummaryTypes {
  income: number;
  outcome: number;
  readonly total: number;
}

export function Summary() { 
  const { transactions } = useContext(TransactionsContext);

  const summary: ISummaryTypes = transactions.reduce((acc, transaction) => {
    switch (transaction.type) {
      case "deposit": {        
        acc.income += transaction.value
      break;
      }        
      case "withdraw": {
        acc.outcome += transaction.value
      break;
      }
    }

    return acc;
  }, {
    income: 0,
    outcome: 0,
    get total(){
      return this.income - this.outcome
    }
  });

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

        <strong>{repairValue(summary.income)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>

        <strong>- {repairValue(summary.outcome)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>

        <strong>{repairValue(summary.total)}</strong>
      </div>
    </Container>
  )
}