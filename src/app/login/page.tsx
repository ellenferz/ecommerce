"use client";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);

  if (!auth) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas! Tente novamente.");
      }

      const data = await response.json();
      auth.login(data.access_token);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="flex bg-white shadow-md rounded-lg a max-w-3xl">
        
        <div className="w-1/2 hidden md:block">
          <Image
            src="/images/login-photo.jpeg"
            alt="Imagem de Login"
            width={500}
            height={500}
            className="rounded-l-lg object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 p-25 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold mb-5 text-center text-amber-600">Login</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="flex flex-col w-60 self-center"> 
            <input //https://api.escuelajs.co/api/v1/users/
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded mb-1"
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded mb-3"
              required
            />
            <button
              type="submit"
              className="w-50 self-center bg-amber-600 text-white p-2 rounded hover:bg-amber-700"
            >
              Entrar
            </button>

            <a className="self-center mt-4 text-amber-600 hover:text-amber-800" href="#">
              Esqueceu sua senha?
            </a>
            <h1 className="self-center mt-4 text-amber-600">Não tem Cadastro? 
            <a className="self-center mt-5 ml-2 text-amber-600 hover:text-amber-800" href="#">
               Clique aqui!
            </a>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
