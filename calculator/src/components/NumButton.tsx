import { useContext, useEffect } from 'react';
import { AppContext } from '../App';

interface NumButtonProps {
  num: number;
}

export const NumButton = ({ num }: NumButtonProps) => {
  const context = useContext(AppContext);

  const handleClick = () => {
    context.setValue(
      context.value === 0 ? Number(num.toString()) : Number(context.value.toString() + num.toString())
    );
  };
  
  useEffect(() => {
    context.setExpression({
      ...context.expression,
      op1: context.oprating ? context.expression.op1 : context.value,
      op2: context.oprating ? context.value : context.expression.op2
    })
  }, [context.value])
  return (
    <button
      className="num-button"
      onClick={handleClick}
    >{num}
    </button>
  );
}