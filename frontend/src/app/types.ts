// types.ts
export interface Product {
    id: number;
    name: string;
    type: string;
    price: number;
}

export interface PurchaseResult {
    pairs: number;
    totalSpent: number;
    remainingBudget: number;
    suggestions: Product[];
}
