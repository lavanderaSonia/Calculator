import { useRef, useState } from "react";
import { KeyPressed, Operator, SpecialOperations } from "@/types";
import { checkSyntax, isNumber, isOperator, mapStringToOperation } from "./utils";

/**
 * Hook that manage calculator logic
 * @returns the operation´s solution, the operation and the methods to save pressed keys and solve the operations
 */
export const useCalculator = () => {
  // Neccessary to manage float numbers and numbers coposed by several digits
  const keysPressed = useRef<string>('');
  const [operation, setOperation] = useState<(number | Operator)[]>([]);
  const [solution, setSolution] = useState<number>(0);

  const REGEX_NEGATIVE_NUMBERS_AND_OPERATORS = /([-+]?\d+\.\d*|[-+]?\d+)([-+*/])([-+]?\d+\.\d*|[-+]?\d+)?/

  const updateDisplay = (solution: number) => {
    setSolution(solution);
    keysPressed.current = `${solution}`;
    setOperation([solution]);
  }

  /**
   * Manage keys typed by user 
   * @param keyPressed key pressed by user
   */
  const calculate = (keyPressed: KeyPressed) => {
    if (keyPressed === 'C') {
      resolveSpecialOperations(keyPressed);
    } else {
      keysPressed.current = checkSyntax(keyPressed, keysPressed.current, solution);
      const operationConverted = mapStringToOperation(keysPressed.current.split(REGEX_NEGATIVE_NUMBERS_AND_OPERATORS).filter(Boolean));
      setOperation(operationConverted);
      if (operation.length === 3 && isOperator(`${keyPressed}`)) {
        resolveOperation();
      }
      if(operation.length === 1) {
        setSolution(0)
      }
    }
  }

  /**
   * Function that resolve special operations like 'C' key
   * @param keyPressed key pressed by user
   */
  const resolveSpecialOperations = (keyPressed: SpecialOperations) => {
    const specialOperations: Record<SpecialOperations, number> = {
      'C': 0
    }
    const solution = specialOperations[keyPressed];
    updateDisplay(solution);
  }

  /**
   * Function that resolve arithmetic operations
   */
  const resolveOperation = () => {
    const [operando1, operator, operando2] = operation as [number, Operator, number];
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