import { KeyPressed } from "@/types";
import useCalculator from "@/hooks/useCalculator";
import Button from "../Button";
import './Calculator.scss';


export const Calculator = () => {

  const {operation, solution, calculate, resolute} = useCalculator();

  const handleClick = (keyPressed: KeyPressed) => {
    calculate(keyPressed);
  }

  return (
    <div className="calculator">
      <div className="calculator__display">
        <div className="calculator__display--history">
          {operation}
        </div>
        {solution}
      </div>
      <div className="calculator__buttons">
        <Button className="button--remove" label="C" onClick={() => handleClick('C')}/>
        <Button className="button--operator" label="/" onClick={() => handleClick('/')}/>
        <Button className="button--operator" label="x" onClick={() => handleClick('*')}/>
        <Button className="button--operator" label="-" onClick={() => handleClick('-')}/>
        <Button label="7" onClick={() => handleClick(7)}/>
        <Button label="8" onClick={() => handleClick(8)}/>
        <Button label="9" onClick={() => handleClick(9)}/>
        <Button className="button--operator" label="+" onClick={() => handleClick('+')}/>
        <Button label="4" onClick={() => handleClick(4)}/>
        <Button label="5" onClick={() => handleClick(5)}/>
        <Button label="6" onClick={() => handleClick(6)}/>
        <Button className="button--operator" label="=" onClick={() => resolute()}/>
        <Button label="1" onClick={() => handleClick(1)}/>
        <Button label="2" onClick={() => handleClick(2)}/>
        <Button label="3" onClick={() => handleClick(3)}/>
        <br/>
        <Button label="0" onClick={() => handleClick(0)}/>
        <Button label="." onClick={() => handleClick('.')}/>
      </div>
    </div>
  
  )
  

}

export default Calculator;