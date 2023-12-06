import { KeyPressed, Operator } from "@/types";

const REGEX_OPERATOR = /[-+*/]/;

export const isOperator = (value: string) => value.match(REGEX_OPERATOR);
export const isNumber = (value: KeyPressed) => typeof value === 'number';

export const mapStringToOperation = (keysPressed: string[]): (number | Operator)[] =>
  keysPressed.map(key => isNaN(parseFloat(key)) ? key as Operator : parseFloat(key))

export const checkAndFixSyntax = (nextKeyPressed: KeyPressed, keysPressed: string, solution: number): string => { 
  if (isOperator(`${nextKeyPressed}`)) {
    // if there is an operator yet
    if (keysPressed.length && isOperator(keysPressed.at(-1)!)) {
      return `${keysPressed.slice(0, -1)}${nextKeyPressed}`;
    }
    // If there isn´t a number before operator
    else if (!keysPressed.length) {
      return `0${nextKeyPressed}`;
    }
    else {
      return keysPressed += nextKeyPressed
    }
  }
  // Type a number when there is a solution and it isn´t a partial operation
  else if (isNumber(nextKeyPressed) && solution !== 0 && !isOperator(keysPressed.at(-1)!)) {
    return `${nextKeyPressed}`;
  }
  else {
    return keysPressed += nextKeyPressed
  }
}