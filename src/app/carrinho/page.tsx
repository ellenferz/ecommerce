"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaTrash } from "react-icons/fa"; 

const CarrinhoPage = () => {
  const { cart, calculateTotal, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Sua sacola está vazia.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-15">
      <h1 className="text-3xl font-normal bg-clip-text flex items-center gap-9 mb-7 mt-4">
        Sacola de Compras
     </h1>

      
      <div className="bg-white shadow-lg rounded-lg p-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-4">
            
            <Image 
              src={item.image} 
              alt={item.name} 
              width={100} 
              height={100} 
              className="w-24 h-24 object-cover rounded-lg" 
            />

            
            <div className="flex-1 ml-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-500">R$ {item.price.toFixed(2)}</p>

              <div className="flex items-center mt-2 space-x-2">
                <button 
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>
            </div>

            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition">
              <FaTrash size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-6 bg-gray-100 rounded-lg text-right shadow-md">
        <p className="text-xl font-semibold">Subtotal: R$ {calculateTotal()}</p>
        <button 
          onClick={() => router.push("/checkout")} 
          className="mt-4 bg-amber-700 text-white px-6 py-2 rounded-lg text-lg hover:bg-amber-800 transition"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default CarrinhoPage;



