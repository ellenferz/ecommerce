"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cart, calculateTotal, finalizePurchase } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    cardBrand: "",
  });

  const router = useRouter();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    console.log("Dados do cliente:", customerInfo);

    finalizePurchase();

    router.push("/agradecimento");
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-2 text-lg">
                <span>{item.name} (x{item.quantity})</span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <p className="text-xl font-semibold mt-4 text-center">
              Total: <span className="text-amber-600">R$ {calculateTotal()}</span>
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Dados do Cliente</h2>
        <input
          type="text"
          name="name"
          placeholder="Nome Completo"
          value={customerInfo.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customerInfo.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Endereço"
          value={customerInfo.address}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-center">Pagamento</h2>

        <input
          type="text"
          name="cardNumber"
          placeholder="Número do Cartão"
          value={customerInfo.cardNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          maxLength={16}
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            name="cardExpiry"
            placeholder="MM/AA"
            value={customerInfo.cardExpiry}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            maxLength={5}
            required
          />
          <input
            type="text"
            name="cardCVV"
            placeholder="CVV"
            value={customerInfo.cardCVV}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            maxLength={3}
            required
          />
        </div>

        <select
          name="cardBrand"
          value={customerInfo.cardBrand}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-3"
          required
        >
          <option value="">Selecione a bandeira</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="elo">Elo</option>
          <option value="amex">American Express</option>
        </select>

        <button
          type="submit"
          className="w-full bg-amber-700 text-white p-3 rounded mt-4 hover:bg-amber-800 transition-all"
        >
          Finalizar Compra
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;

