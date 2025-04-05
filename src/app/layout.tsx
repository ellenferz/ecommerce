import Header from "@/components/Header";
import "./globals.css"; 
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
      <AuthProvider>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </AuthProvider>
      </body>
    </html>
  );
}

