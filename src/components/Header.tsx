
"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";


const Header: React.FC = () => {
  const { cart } = useCart(); 

  return (
    <header className="bg-indianred text-white p-4 hover:text-amber-100">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {"KOA"}
        <div className="text-xl font-semibold">
          <Link href="/">Início</Link>
        </div>

     
        <div className="m1-4 flow-root lg:ml-6">
          <Link href="/carrinho" className="group -m-2 flex items-center p-2">
          <svg className="size-6 shrin text-white group-hover:text-amber-100" 
          fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
          data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>

            <button className="relative">
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
