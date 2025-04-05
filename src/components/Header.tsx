"use client";

import { useCart } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";

const Header: React.FC = () => {
  const { cart } = useCart();
  const auth = useContext(AuthContext);

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showProdutosDropdown, setShowProdutosDropdown] = useState(false);

  const produtosRef = useRef<HTMLDivElement>(null);
  const perfilRef = useRef<HTMLDivElement>(null);

  if (!auth) return null;

  const handleLogout = () => {
    auth.logout();
    setShowProfileDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        produtosRef.current &&
        !produtosRef.current.contains(event.target as Node)
      ) {
        setShowProdutosDropdown(false);
      }
      if (
        perfilRef.current &&
        !perfilRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-red-500 text-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-4">
       
        <div>
          <Image
            src="/images/koa-logo.png"
            alt="Logo KOA"
            width={60}
            height={5}
            className="object-cover"
          />
        </div>

        
        <div className="flex items-center gap-6 text-xl font-semibold relative">
          <Link href="/" className="hover:text-amber-100">Início</Link>

         
          <div ref={produtosRef} className="relative">
            <button
              onClick={() => setShowProdutosDropdown(!showProdutosDropdown)}
              className="text-white font-medium hover:text-amber-100"
            >
              Produtos
            </button>
            {showProdutosDropdown && (
              <div className="absolute mt-3 w-52 bg-[#431010] shadow-lg rounded-lg z-20">
                <a href="#" className="block px-4 py-2 text-white hover:bg-white hover:text-[#431010]">Rosto</a>
                <a href="#" className="block px-4 py-2 text-white hover:bg-white hover:text-[#431010]">Corpo</a>
                <a href="#" className="block px-4 py-2 text-white hover:bg-white hover:text-[#431010]">Acessórios</a>
              </div>
            )}
          </div>

          
          {!auth.user ? (
            <Link href="/login" className="hover:text-amber-100">Login</Link>
          ) : (
            <div ref={perfilRef} className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="hover:text-amber-100"
              >
                Perfil
              </button>
              {showProfileDropdown && (
                <div className="absolute  mt-3 w-48 bg-[#431010] rounded-md shadow-md z-20">
                  <Link href="/meus-dados" className="block px-4 py-2  text-white hover:bg-white hover:text-[#431010]">Meus dados</Link>
                  <Link href="/minhas-compras" className="block px-4 py-2  text-white hover:bg-white hover:text-[#431010]">Minhas compras</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          
          <Link href="/carrinho" className="relative flex items-center hover:text-amber-100">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
                  1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 
                  0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 
                  5.513 7.5h12.974c.576 0 1.059.435 
                  1.119 1.007ZM8.625 10.5a.375.375 
                  0 1 1-.75 0 .375.375 0 0 1 .75 
                  0Zm7.5 0a.375.375 0 1 1-.75 
                  0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
