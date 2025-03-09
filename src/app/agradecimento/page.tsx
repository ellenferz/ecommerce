"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AgradecimentoPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("Redirecionando em 5 segundos...");
    const timeout = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-amber-600">Compra Concluída!</h1>
        <p className="mt-3 text-amber-700">Obrigado por sua compra! Em breve, você receberá um e-mail com os detalhes.</p>
        <p className="mt-5 text-sm text-amber-500">Você será redirecionado para a página inicial em alguns segundos...</p>
      </div>
    </div>
  );
};

export default AgradecimentoPage;

