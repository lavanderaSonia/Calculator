import { describe, it, expect } from 'vitest';
import { checkAndFixSyntax, isNumber, isOperator, mapStringToOperation } from '../utils';

describe('utils', () => {
    it('test isOperator truth', () => {
      expect(isOperator('+')).toBeTruthy();
    });
    it('test isOperator false', () => {
    expect(isOperator('.')).toBeFalsy();
    });
    it('test isNumber truth', () => {
      expect(isNumber(2)).toBeTruthy();
    });
    it('test isOperator false', () => {
      expect(isNumber('.')).toBeFalsy();
    });
    it('test mapStringToOperation', () => {
      expect(mapStringToOperation(['3.3', '+', '-4'])).toStrictEqual([3.3, '+', -4]);
    });
    it('test checkAndFixSyntax - two operators', () => {
      expect(checkAndFixSyntax('+', '3-', 0)).toStrictEqual('3+');
    });
    it('test checkAndFixSyntax - not number before operators', () => {
      expect(checkAndFixSyntax('+', '', 0)).toStrictEqual('0+');
    });
    it('test checkAndFixSyntax - number after solution', () => {
      expect(checkAndFixSyntax(2, '40', 20)).toStrictEqual('2');
    });
    it('test checkAndFixSyntax - number after operator', () => {
      expect(checkAndFixSyntax(2, '40+', 0)).toStrictEqual('40+2');
    });
});