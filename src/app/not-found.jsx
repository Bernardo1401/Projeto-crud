"use client";
import { Button } from "antd";
import { UserOutlined, HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-yellow-950 to-black flex items-center justify-center p-5 relative overflow-hidden">
      <div className="max-w-lg w-full text-center space-y-8 relative z-10">
        <div className="mb-6 relative">
          <span className="text-8xl font-mono font-bold bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent opacity-20 select-none">
            404
          </span>
          <div className="absolute inset-0 text-8xl font-mono font-bold text-yellow-600 opacity-10 blur-sm select-none">
            404
          </div>
        </div>
        <div className="relative mb-8">
          <div className="animate-bounce">
            <div className="relative inline-block">
              <Image
                src="/img/not-found.png"
                alt="404 Not Found"
                width={320}
                height={320}
                className="mx-auto drop-shadow-2xl filter hover:brightness-110 transition-all duration-300"
                priority
              />
              <div className="absolute inset-0 bg-yellow-600 opacity-10 rounded-full blur-3xl -z-10 scale-110"></div>
            </div>
          </div>
        </div>
        <div className="space-y-6 mb-10">
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent leading-tight tracking-wide">
              ERRO 404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 tracking-wide">
              Página Não Encontrada
            </h2>
          </div>
          
          <p className="text-xl text-gray-300 leading-relaxed px-4 max-w-md mx-auto">
            Ops! Parece que essa página já encerrou sua carreira no octógono 
          </p>
          <div className="w-16 h-0.5 bg-yellow-600 mx-auto my-6 opacity-60"></div>
          <div className="text-sm text-gray-400 space-y-2">
            <p className="text-yellow-500">💡 Volte para a página inicial</p>
            <p className="text-yellow-500">🥊 Explore o mundo dos lutadores</p>
          </div>
        </div>
        <div className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                type="primary"
                size="large"
                icon={<HomeOutlined />}
                className="w-full sm:w-auto px-8 h-12 text-lg font-bold transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8941F 100%)",
                  borderColor: "#D4AF37",
                  color: "#000000",
                  borderRadius: "25px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  boxShadow: "0 5px 15px rgba(212, 175, 55, 0.3)",
                }}
              >
                Home
              </Button>
            </Link>
            
            <Link href="/lutadores">
              <Button
                size="large"
                icon={<UserOutlined />}
                className="w-full sm:w-auto px-8 h-12 text-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #000000 100%)",
                  borderColor: "#D4AF37",
                  color: "#D4AF37",
                  borderRadius: "25px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  border: "2px solid #D4AF37",
                  boxShadow: "0 5px 15px rgba(212, 175, 55, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%)";
                  e.target.style.color = "#FFD700";
                  e.target.style.borderColor = "#FFD700";
                  e.target.style.boxShadow = "0 8px 20px rgba(212, 175, 55, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #000000 100%)";
                  e.target.style.color = "#D4AF37";
                  e.target.style.borderColor = "#D4AF37";
                  e.target.style.boxShadow = "0 5px 15px rgba(212, 175, 55, 0.2)";
                }}
              >
                Lutadores
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700">
          <p className="text-base text-gray-400 italic">
            "No octógono da vida, todo round perdido é uma lição aprendida"
          </p>
        </div>
      </div>
    </div>
  );
}
