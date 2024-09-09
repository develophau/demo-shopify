// components/ProductList.tsx
import React from 'react';
import { Product } from '../types';

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="space-y-4">
            {products.map(product => (
                <div key={product.id} className="border p-4 rounded shadow-md">
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600">Type: {product.type}</p>
                    <p className="text-sm text-gray-600">Price: ${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
