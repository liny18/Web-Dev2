import { useContext } from 'react';
import { AppContext } from '../App';

interface IProps {
  op: string;
}

export const OpButton = ({ op }: IProps) => {
  const context = useContext(AppContext);

  const handleClick = () => {
    context.setExpression({
      ...context.expression,
      operator: op
    });
    context.setValue(0);
    context.setOprating(true);
  };
  return (
    <button
      className="op-button"
      onClick={handleClick} 
    >{op}
    </button>
  );
}