import { ExampleItem, ExampleSummary } from "./example.types";

/**
 * Calcule la somme des valeurs des éléments éligibles (non exclus).
 * @param items Liste des éléments d'exemple.
 * @returns La somme des valeurs des éléments non exclus.
 */
export function calculateEligibleTotal(items: ExampleItem[]): number {
  return items.filter((item) => !item.isExcluded).reduce((sum, item) => sum + item.value, 0);
}

/**
 * Calcule la somme totale des valeurs de tous les éléments.
 * @param items Liste des éléments d'exemple.
 * @returns La somme totale des valeurs de tous les éléments.
 */
export function calculateTotal(items: ExampleItem[]): number {
  return items.reduce((sum, item) => sum + item.value, 0);
}

/**
 * Résume les informations sur une liste d'éléments.
 * @param items Liste des éléments d'exemple.
 * @returns Un objet ExampleSummary contenant le total, le total éligible, le nombre d'éléments et si des éléments sont exclus.
 */
export function summarize(items: ExampleItem[]): ExampleSummary {
  const total = calculateTotal(items);
  const eligibleTotal = calculateEligibleTotal(items);
  const itemCount = items.length;
  const hasExcludedItems = items.some((item) => item.isExcluded);

  return {
    total,
    eligibleTotal,
    itemCount,
    hasExcludedItems,
  };
}