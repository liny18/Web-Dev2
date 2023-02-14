import { useContext, useEffect } from 'react';
import { AppContext } from '../App';

interface IProps {
  eq: string;
}

export const EqButton = ({ eq }: IProps) => {
  const context = useContext(AppContext);

  const evaluate = (sign: string) => {
    console.log(context.expression.op1, context.expression.op2, sign),
    context.setExpression({
      ...context.expression,
      result: sign === '+' ? context.expression.op1 + context.expression.op2 :
        sign === '-' ? context.expression.op1 - context.expression.op2 :
          sign === '*' ? context.expression.op1 * context.expression.op2 :
            sign === '/' ? context.expression.op1 / context.expression.op2 : 0
    })
  }

  const handleClick = () => {
    evaluate(context.expression.operator);
    context.setOprating(false);
    // context.setValue(0);
  };
  
  useEffect(() => {
    context.setOprating(false);
    context.expression.op1 = 0;
    context.expression.op2 = 0;
    context.expression.operator = '+';
  }, [context.expression.result])

  return (
    <button
      className="eq-button"
      onClick={handleClick}
    >{eq}
    </button>
  );
}