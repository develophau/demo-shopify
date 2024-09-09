import ProductWrap from './components/ProductWrap';
import Calculator from './components/Calculator';

export default function Home() {
  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Computer-Keyboard Purchase Maximizer</h1>

        {/* Client Component */}
        <Calculator />

        {/* Server Component */}
        <ProductWrap />
      </div>
  );
}
