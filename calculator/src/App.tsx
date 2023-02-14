import { useState, useContext, createContext } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { NumButton } from './components/NumButton'
import { OpButton } from './components/OpButton'
import { EqButton } from './components/Equal'
import { Form } from './components/Form'

export const AppContext = createContext<{
  value: number,
  setValue: (value: number) => void
  expression: IExpression,
  setExpression: (expression: IExpression) => void
  oprating: boolean,
  setOprating: (oprating: boolean) => void
}>({
  value: 0,
  setValue: () => { },
  expression: {
    op1: 0,
    op2: 0,
    operator: '+',
    result: 0
  },
  setExpression: () => { },
  oprating: false,
  setOprating: () => { }
})

interface IExpression {
  op1: number,
  op2: number,
  operator: string,
  result: number
}

function App() {

  const [value, setValue] = useState(0);
  const [oprating, setOprating] = useState(false);
  const [expression, setExpression] = useState<IExpression>({
    op1: 0,
    op2: 0,
    operator: '+',
    result: 0
  })

  const numberButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operatorButtons = ['+', '-', '*', '/'];
  const equalButton = '=';

  return (
    <AppContext.Provider value={{ value, setValue, expression, setExpression, oprating, setOprating }}>
      <div className="App">
        <header>
          <img src={reactLogo} className="App-logo" alt="logo" />
          <p>
            Calculator
          </p>
        </header>
        <main>
          <Form />
          <div className="number-buttons">
            {numberButtons.map((num,index) => (
              <NumButton key={index} num={num} />
            ))}
          </div>
          <div className="operator-buttons">
            {operatorButtons.map((operator, index) => (
              <OpButton key={index} op={operator} />
            ))}
          </div>
          <EqButton eq={equalButton} />
          <div className="expression">
            <p>
              {expression.op1} {expression.operator} {expression.op2}
            </p>
          </div>
            <div>
              <p>
                result: {expression.result}
              </p>
            </div>
        </main>
      </div>
    </AppContext.Provider>
  )
}

export default App
