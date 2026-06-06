import { describe, it, expect } from 'vitest';
import { calculateEligibleTotal, calculateTotal, summarize } from '../_example';
import { ExampleItem, ExampleSummary } from '../_example/example.types';

// Helper pour créer des ExampleItem avec des valeurs par défaut
const item = (partial?: Partial<ExampleItem>): ExampleItem => ({
  id: 'test-id',
  value: 10,
  isExcluded: false,
  ...partial,
});

describe('calculateEligibleTotal', () => {
  it('should sum values of non-excluded items', () => {
    const items = [item(), item({ isExcluded: true }), item({ value: 20 })];
    expect(calculateEligibleTotal(items)).toBe(30);
  });

  it('should return 0 if all items are excluded', () => {
    const items = [item({ isExcluded: true }), item({ isExcluded: true })];
    expect(calculateEligibleTotal(items)).toBe(0);
  });

  it('should return 0 for an empty array', () => {
    const items: ExampleItem[] = [];
    expect(calculateEligibleTotal(items)).toBe(0);
  });

  it('should handle negative values correctly', () => {
    const items = [item({ value: -5 }), item({ value: 15, isExcluded: true }), item({ value: -10 })];
    expect(calculateEligibleTotal(items)).toBe(-15);
  });
});

describe('calculateTotal', () => {
  it('should sum values of all items', () => {
    const items = [item(), item({ isExcluded: true }), item({ value: 20 })];
    expect(calculateTotal(items)).toBe(40);
  });

  it('should return 0 for an empty array', () => {
    const items: ExampleItem[] = [];
    expect(calculateTotal(items)).toBe(0);
  });

  it('should handle negative values correctly', () => {
    const items = [item({ value: -5 }), item({ value: 15, isExcluded: true }), item({ value: -10 })];
    expect(calculateTotal(items)).toBe(0);
  });
});

describe('summarize', () => {
  it('should produce a complete summary for mixed items', () => {
    const items = [item(), item({ isExcluded: true }), item({ value: 20 })];
    const summary = summarize(items);
    expect(summary).toEqual({
      total: 40,
      eligibleTotal: 30,
      itemCount: 3,
      hasExcludedItems: true,
    });
  });

  it('should produce a summary with no excluded items', () => {
    const items = [item(), item({ value: 20 })];
    const summary = summarize(items);
    expect(summary).toEqual({
      total: 30,
      eligibleTotal: 30,
      itemCount: 2,
      hasExcludedItems: false,
    });
  });

  it('should produce a summary for an empty array', () => {
    const items: ExampleItem[] = [];
    const summary = summarize(items);
    expect(summary).toEqual({
      total: 0,
      eligibleTotal: 0,
      itemCount: 0,
      hasExcludedItems: false,
    });
  });

  it('should produce a summary when all items are excluded', () => {
    const items = [item({ isExcluded: true }), item({ value: 20, isExcluded: true })];
    const summary = summarize(items);
    expect(summary).toEqual({
      total: 30,
      eligibleTotal: 0,
      itemCount: 2,
      hasExcludedItems: true,
    });
  });
});