import { describe, it, expect } from 'vitest';
import {renderHook} from '@testing-library/react';
import useCalculator from '../useCalculator';

/**
 * @jest-environment jsdom
 */
describe('useCalculator', () => {
  it('test calculate and resolute simulating math operation', () => {
    const { result, rerender } = renderHook(() => useCalculator())
    result.current.calculate(2);
    rerender();
    expect(result.current.operation).toEqual([2]);
    
    result.current.calculate('+');
    rerender();
    expect(result.current.operation).toStrictEqual([2, '+']);

    result.current.calculate(3);
    rerender();
    expect(result.current.operation).toStrictEqual([2, '+', 3]);

    result.current.calculate('.');
    result.current.calculate(2);

    rerender();
    expect(result.current.operation).toStrictEqual([2, '+', 3.2]);

    result.current.resolute();
    rerender();
    expect(result.current.solution).toStrictEqual(5.2);
  });
});