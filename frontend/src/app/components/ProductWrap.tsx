import ProductList from '../components/ProductList';
import { Product } from '../types';
import axios from 'axios';

// Hàm này sẽ fetch data từ API trong Server Component
async function getProducts(): Promise<Product[]> {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await axios.get<Product[]>(`${backendUrl}/products`);
    return response.data;
}

export default async function ProductWrap() {
    const products = await getProducts();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Available Products</h1>
            {products.length > 0 ? (
                <ProductList products={products} />
            ) : (
                <p>No products available.</p>
            )}
        </div>
    );
}
