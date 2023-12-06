import { useRef, useState } from "react";
import { KeyPressed, Operator, SpecialOperations } from "@/types";
import { checkAndFixSyntax, isOperator, mapStringToOperation } from "./utils";

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

  /**
   * Function that update data to show in the display
   * @param solution arithmetic operation solution
   */
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
    const specialOperations = resolveSpecialOperations(keyPressed);
    if(specialOperations) {
      updateDisplay(specialOperations);
    }
    else {
      keysPressed.current = checkAndFixSyntax(keyPressed, keysPressed.current, solution);
      const operationConverted = mapStringToOperation(keysPressed.current.split(REGEX_NEGATIVE_NUMBERS_AND_OPERATORS).filter(Boolean));
      setOperation(operationConverted);
      if (operation.length === 3 && isOperator(`${keyPressed}`)) {
        updateDisplay(resolveOperation());
      }
      if(operation.length === 1) {
        setSolution(0)
      }
    }
  }

  /**
   * Function that execute operation and show result in the display
   */
  const resolute = () => {
    const solution = resolveOperation();
    updateDisplay(solution);
  }

  /**
   * Function that resolve special operations like 'C' key
   * @param keyPressed key pressed by user
   */
  const resolveSpecialOperations = (keyPressed: KeyPressed): (number | null) => {
    const specialOperations: Record<SpecialOperations, number> = {
      'C': 0
    }
    return specialOperations[keyPressed as keyof typeof specialOperations] ?? null;
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
    return operations[operator];
  }

  return { operation, solution, calculate, resolute }

}

export default useCalculator;