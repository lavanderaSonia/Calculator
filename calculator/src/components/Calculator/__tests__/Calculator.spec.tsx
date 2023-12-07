import { describe, it, expect } from 'vitest';
import { render, fireEvent, screen} from '@testing-library/react';
import Calculator from '..'

/**
 * @jest-environment jsdom
 */
describe('Calculator', () => {
  const calculator = render(<Calculator />);
  it('operate with two numbers and 1 operator', async () => {
    // Click button with number 1
    fireEvent.click(screen.getAllByText('1')[0]);
    // Click button with operator *
    fireEvent.click(screen.getAllByText('x')[0]);
    // Click button with number 2
    fireEvent.click(screen.getAllByText('2')[0]);
    // Click button equal
    fireEvent.click(screen.getAllByText('=')[0]);
    // Check solution display
    expect(calculator.getByTestId('calculator-history').textContent).toBe('2');
  });
  it('click operator when there is a solution in the screen 2', () => {
    // Click button with operator +
    fireEvent.click(screen.getAllByText('+')[0]);
    // Click button with number 2
    fireEvent.click(screen.getAllByText('2')[0]);
    // Click button equal
    fireEvent.click(screen.getAllByText('=')[0]);
    // Check solution display
    expect(calculator.getAllByTestId('calculator-history')[0].textContent).toBe('4');
  });
  it('click another number when there is a solution in the display', () => {
    // Click button with number 5
    fireEvent.click(screen.getAllByText('5')[0]);
    // Click button with operator -
    fireEvent.click(screen.getAllByText('-')[0]);
    // Click button with number 8
    fireEvent.click(screen.getAllByText('8')[0]);
    // Click button equal
    fireEvent.click(screen.getAllByText('=')[0]);
    // Check solution display
    expect(calculator.getAllByTestId('calculator-history')[0].textContent).toBe('-3');
  });
  it('clean display and do operation with float numbers', () => {
    // Clean display
    fireEvent.click(screen.getAllByText('C')[0]);
    // Check display after clean 
    expect(calculator.getAllByTestId('calculator-history')[0].textContent).toBe('0');
    // Click button with number 4
    fireEvent.click(screen.getAllByText('4')[0]);
    // Click button with operator /
    fireEvent.click(screen.getAllByText('/')[0]);
    // Click button with number 8
    fireEvent.click(screen.getAllByText('2')[0]);
    fireEvent.click(screen.getAllByText('.')[0]);
    fireEvent.click(screen.getAllByText('3')[0]);
    // Click button equal
    fireEvent.click(screen.getAllByText('=')[0]);
    // Check solution display
    expect(calculator.getAllByTestId('calculator-history')[0].textContent).toContain('1.73');
  });
});