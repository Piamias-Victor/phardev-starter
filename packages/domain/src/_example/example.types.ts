export interface ExampleItem {
  readonly id: string;
  readonly value: number;
  readonly isExcluded: boolean;
}

export interface ExampleSummary {
  readonly total: number;
  readonly eligibleTotal: number;
  readonly itemCount: number;
  readonly hasExcludedItems: boolean;
}