import { useRef, useState } from "react";

type Operator = '+' | '-' | '*' | '/';
type SpecialCharacter = '.';
type SpecialOperations = 'C';

type KeyPressed = number | Operator | SpecialCharacter | SpecialOperations;

export const useCalculator = () => {
  const keysPressed = useRef<string>('');
  const [operation, setOperation] = useState<(number | Operator)[]>([]);
  const [solution, setSolution] = useState<number>(0);

  const updateDisplay = (solution: number) => {
    setSolution(solution);
    keysPressed.current = `${solution}`;
    setOperation([solution]);
  }

  const cleanDisplay = (nextKeyPressed: KeyPressed) => {
    setSolution(0);
    keysPressed.current = `${nextKeyPressed}`;
    setOperation([nextKeyPressed]);
  }

  const isOperator = (value: string) => value.match(/[-+*/]/)

  const mapStringToOperation = (keysPressed: string[]): (number | Operator)[] =>
    keysPressed.map(key => isNaN(parseFloat(key)) ? key as Operator : parseFloat(key))

  const checkSyntax = (nextKeyPressed: KeyPressed) => {
    if (typeof nextKeyPressed !== 'number' && keysPressed.current.length && isOperator(keysPressed.current.at(-1))) {
      keysPressed.current = `${keysPressed.current.slice(0, keysPressed.current.length - 1)}${nextKeyPressed}`;
    }
    else if (typeof nextKeyPressed === 'number' && solution !== 0) {
      cleanDisplay(nextKeyPressed);
    }
    else {
      keysPressed.current = `${keysPressed.current}${nextKeyPressed}`;
    }
  }

  const calculate = (keyPressed: KeyPressed) => {
    if (keyPressed === 'C') resolveSpecialOperations(keyPressed);
    checkSyntax(keyPressed);
    const operationConverted = mapStringToOperation(keysPressed.current.split(/(?<=[-+*/])|(?=[-+*/])/));
    console.log(operationConverted)
    setOperation(operationConverted);
    if (operation.length === 3 && typeof keyPressed !== 'number' && isOperator(keyPressed)) {
      resolveOperation();
    }
  }

  const resolveSpecialOperations = (keyPressed: SpecialOperations) => {
    const specialOperations: Record<SpecialOperations, number> = {
      'C': 0
    }
    const solution = specialOperations[keyPressed];
    updateDisplay(solution);
  }

  const resolveOperation = () => {
    const [operando1, operator, operando2] = operation as [number, Operator, number];
    console.log("OPERATION", operation, operando1, operator)
    const operations: Record<Operator, number> = {
      '+': operando1 + operando2,
      '-': operando1 - operando2,
      '*': operando1 * operando2,
      '/': operando1 / operando2
    }
    const solution = operations[operator];
    updateDisplay(solution);
  }

  return { operation, solution, calculate, resolveOperation }

}

export default useCalculator;