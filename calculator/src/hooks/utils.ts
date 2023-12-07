import { KeyPressed, Operator } from "@/types";

const REGEX_OPERATOR = /[-+*/]/;

/**
 * Function that check if a string is an operator
 * @param value 
 * @returns 
 */
export const isOperator = (value: string) => value.match(REGEX_OPERATOR);

/**
 * Function that check if a key typed is a number
 * @param value key typed by user
 * @returns true if value is a number or false
 */
export const isNumber = (value: KeyPressed) => typeof value === 'number';

/**
 * Function that convert string to operators and numbers
 * @param keysPressed key typed by user
 * @returns an array of numbers and operators
 */
export const mapStringToOperation = (keysPressed: string[]): (number | Operator)[] =>
  keysPressed.map(key => isNaN(parseFloat(key)) ? key as Operator : parseFloat(key))

/**
 * Function that check and fix the syntax introduced by the user
 * @param nextKeyPressed key typed by the user
 * @param keysPressed all the keys typed by the user
 * @param solution solution of the operation
 * @returns the operation fixed 
 */
export const checkAndFixSyntax = (nextKeyPressed: KeyPressed, keysPressed: string, solution: number): string => {
  const isNextKeyPressedOperator = isOperator(`${nextKeyPressed}`);
  const isLastKeyOperator = keysPressed.length && isOperator(keysPressed.at(-1)!);
  const isInputEmpty = !keysPressed.length;
  const isNumberAfterSolution = isNumber(nextKeyPressed) && solution !== 0 && !isLastKeyOperator;

  if (isNextKeyPressedOperator) {
    if (isLastKeyOperator) {
      return `${keysPressed.slice(0, -1)}${nextKeyPressed}`;
    } else if (isInputEmpty) {
      return `0${nextKeyPressed}`;
    } else {
      return `${keysPressed}${nextKeyPressed}`;
    }
  } else if (isNumberAfterSolution) {
    return `${nextKeyPressed}`
  } else {
    return `${keysPressed}${nextKeyPressed}`;
  }
}