import Header from "@/components/Header";
import "./globals.css"; 
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

