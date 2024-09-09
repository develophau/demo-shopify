'use client';

import { useState } from 'react';
import axios from 'axios';
import { PurchaseResult } from '../types';

export default function Calculator() {
    const [budget, setBudget] = useState<string>('');
    const [result, setResult] = useState<PurchaseResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const handleCalculate = async () => {
        try {

            const response = await axios.post<PurchaseResult>(`${backendUrl}/purchase`, { budget: parseFloat(budget) });
            const data = response.data;

            if (data.pairs === 0) {
                setError('Your budget is not enough to purchase any products. Please adjust your budget.');
                setResult(null);
            } else {
                setResult(data);
                setError(null);
            }
        } catch (err) {
            setError('An error occurred while processing your request. Please try again later.');
        }
    };

    return (
        <div className="my-4">
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                Enter your budget:
            </label>
            <input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
                onClick={handleCalculate}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
                Calculate
            </button>

            {error && <div className="text-red-500 font-semibold">{error}</div>}

            {result && (
                <div className="mt-4 p-4 border rounded shadow-md bg-gray-50">
                    <h2 className="text-lg font-semibold">Results:</h2>
                    <p>Number of pairs purchased: {result.pairs}</p>
                    <p>Total spent: ${result.totalSpent}</p>
                    <p>Remaining budget: ${result.remainingBudget}</p>
                    {result.suggestions.length > 0 && (
                        <div>
                            <h3 className="text-md font-semibold mt-2">Suggestions:</h3>
                            <ul>
                                {result.suggestions.map((product) => (
                                    <li key={product.id} className="border p-2 rounded mt-1">
                                        {product.name} - ${product.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
