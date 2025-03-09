"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useCart } from "@/context/CartContext";

const banners = [
  { id: 1, image: "/images/banner-1.jpeg", alt: "Promoção Especial" },
  { id: 2, image: "/images/banner-2.jpeg", alt: "Descontos Imperdíveis" },
];

export default function Home() {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  } | null>(null);

  const handleAddToCart = (product: { id: number; name: string; price: number; description: string; image: string }) => {
    const productWithQuantity = { ...product, quantity: 1 }; 
    addToCart(productWithQuantity);
  };

  return (
    <main className="p-4">
      <Swiper navigation={true} modules={[Navigation]} className="w-full mx-auto mb-25">
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Image
              src={banner.image}
              alt={banner.alt}
              width={1200}
              height={600}
              className="w-full h-[500px] object-cover rounded-lg"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <h1 className="text-2xl mb-5 text-black-800 m-4">Mais Vendidos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-95 object-cover rounded-md transition-transform duration-300 group-hover:scale-95"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600 mt-2">R$ {product.price.toFixed(2)}</p>
            </div>
            <div className="absolute bottom-25 left-8 w-70  bg-amber-800/50 text-white text-sm text-center py-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-md">
              <p className="text-white text-lg font-medium">Ver mais detalhes</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white mt-15 p-8 rounded-lg shadow-lg w-[300px] relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-600 hover:text-black" onClick={() => setSelectedProduct(null)}>
              x
            </button>
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.name}
              width={600}
              height={600}
              className="w-full h-auto object-cover rounded-md"
            />
            <h2 className="text-x1 font-semibold mt-4">{selectedProduct.name}</h2>
            <p className="text-gray-600 mb-2">R$ {selectedProduct.price.toFixed(2)}</p>
            <p className="mt-4">{selectedProduct.description}</p>
            <button
              onClick={() => handleAddToCart(selectedProduct)}
              className="mt-2 bg-amber-700 text-white px-4 py-2 rounded-md w-full hover:bg-amber-800 transition"
            >
              Adicionar à Sacola
            </button>
          </div>
        </div>
      )}

     <section className="bg-gray-50 py-12 mt-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-medium mb-8">O que nossos clientes dizem </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="/images/cliente-1.jpeg"
                alt="Cliente 1"
                width={80}
                height={80}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Brenda Silva</h3>
              <p className="text-gray-600">"Produto incrível, super recomendo! Atendimento excelente."</p>
              <div className="mt-4 flex justify-center">
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>
            
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="/images/cliente-2.jpeg" 
                alt="Cliente 2"
                width={80}
                height={80}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Jéssica Souza</h3>
              <p className="text-gray-600">"A qualidade do produto é excelente. Vou comprar mais vezes."</p>
              <div className="mt-4 flex justify-center">
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>
            
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Image
                src="/images/cliente-3.jpeg" 
                alt="Cliente 3"
                width={80}
                height={80}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Tati Oliveira</h3>
              <p className="text-gray-600">"Entrega rápida e produto de ótima qualidade. Vou recomendar para meus amigos."</p>
              <div className="mt-4 flex justify-center">
                <span className="text-yellow-500">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-400 text-black py-5 mt-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Fale Conosco</h2>
          <p className="mb-4">Rua Vieira Carvalho, 70, Centro - Rio de Janeiro, RJ</p>
          <p className="mb-4">Telefone: (21) 1234-5678</p>
          <p className="mb-4">Email: contato@koa.com.br</p>

          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-amber-700">Instagram</a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-amber-700">Facebook</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-amber-700">Twitter</a>
          </div>

          <p className="text-sm mt-6">© 2025 KOA. Todos os direitos reservados.</p>
        </div>
      </footer>


    </main>
  );
}

