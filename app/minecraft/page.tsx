"use client";

import React, { useState } from "react";
import "../globals.css";
import { Copy, Check } from "lucide-react";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const serverIP = "_minecraft_ZG791C470TdRs3QjX9Z1GwSEyuKD.fathooo.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(serverIP);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // ← Corregido el setTimeout
    } catch (err) {
      console.error("Error copiando al portapapeles", err);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center font-rajdhani overflow-x-hidden relative bg-[linear-gradient(135deg,_#0d1421_0%,_#1a2332_25%,_#2d4a22_50%,_#1a2332_75%,_#0d1421_100%)]">
      {/* Cubos flotantes */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`cube cube-${i + 1}`} />
        ))}
      </div>

      {/* Contenedor principal */}
      <div className="max-w-[900px] w-[95%] relative z-20">
        <div className="announcement-card relative overflow-hidden p-10 rounded-[20px] backdrop-blur border-[2px] border-[rgba(34,139,34,0.3)] bg-[rgba(13,20,33,0.9)] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          {/* Brillo animado */}
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-radial animate-pulse-glow" />

          {/* Título */}
          <div className="header text-center mb-10 relative z-10">
            <h1 className="title text-5xl md:text-[3rem] font-orbitron font-black text-[#22C55E] text-shadow animate-glow mb-4">
              NUEVO SERVIDOR
            </h1>
            <p className="subtitle text-xl text-slate-400 font-light tracking-wide">
              Mundo Minecraft con Mods
            </p>
          </div>

          {/* Información */}
          <div className="info-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-10">
            <div className="info-item bg-[rgba(26,35,50,0.7)] p-6 rounded-xl border border-[rgba(34,139,34,0.2)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden hover:shadow-[0_10px_30px_rgba(34,197,94,0.2)] hover:border-[rgba(34,139,34,0.5)]">
              <div className="info-label font-orbitron uppercase text-[1.1rem] text-[#22C55E] font-bold tracking-wider mb-2">
                Versión
              </div>
              <div className="info-value text-[#E2E8F0] text-[1.2rem]">
                Fabric 1.21.5
              </div>
              <div className="absolute top-0 left-[-100%] w-full h-full bg-[linear-gradient(90deg,_transparent,_rgba(34,197,94,0.1),_transparent)] transition-all duration-500 hover:left-full" />
            </div>

            <div className="info-item bg-[rgba(26,35,50,0.7)] p-6 rounded-xl border border-[rgba(34,139,34,0.2)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden hover:shadow-[0_10px_30px_rgba(34,197,94,0.2)] hover:border-[rgba(34,139,34,0.5)]">
              <div className="info-label font-orbitron uppercase text-[1.1rem] text-[#22C55E] font-bold tracking-wider mb-2">
                Estado
              </div>
              <div className="info-value text-[#E2E8F0] text-[1.2rem]">
                🟢 Online
              </div>
              <div className="absolute top-0 left-[-100%] w-full h-full bg-[linear-gradient(90deg,_transparent,_rgba(34,197,94,0.1),_transparent)] transition-all duration-500 hover:left-full" />
            </div>

            <div className="info-item server-ip md:col-span-2 text-center bg-[rgba(34,197,94,0.1)] border-2 border-[rgba(34,197,94,0.3)] p-6 rounded-xl relative overflow-hidden">
              <div className="info-label font-orbitron uppercase text-[1.1rem] text-[#22C55E] font-bold tracking-wider mb-2">
                IP del Servidor
              </div>

              {/* Contenedor del texto y el botón de copiar */}
              <div className="flex items-center gap-2">
                <code className="flex-1 font-mono text-green-400 text-lg break-all bg-slate-900 px-2 py-2 rounded">
                  {serverIP}
                </code>

                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    copied
                      ? "bg-green-600 text-white"
                      : "bg-green-700 hover:bg-green-600 text-white"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="links-section flex flex-wrap justify-center gap-5 relative z-10">
            <a
              href="https://fabricmc.net/use/installer/"
              target="_blank"
              className="link-button"
            >
              ⚙️ Descargar Fabric
            </a>
            <a
              href="https://drive.google.com/drive/folders/1tzJsOjjoqt8wrcbASV9BxGqouyEO8fRu?usp=sharing"
              target="_blank"
              className="link-button"
            >
              📦 Descargar Mods
            </a>
          </div>
          <section className="text-slate-300 relative z-10 max-w-3xl mx-auto text-left space-y-6 mt-8">
            <h2 className="text-2xl font-orbitron font-bold text-green-500 mb-4">
              Cómo instalar y jugar
            </h2>
            <p>
              Para instalar los mods, primero descarga e instala{" "}
              <strong>Fabric</strong> desde el botón arriba (version 1.21.5).
              Luego, descarga los mods y colócalos en la carpeta{" "}
              <code className="bg-gray-800 px-1 rounded">mods</code> dentro de
              tu carpeta de Minecraft.
            </p>
            <p>
              Para encontrar la carpeta de Minecraft en Windows, presiona{" "}
              <kbd className="bg-gray-900 px-2 py-1 rounded border border-gray-700">
                Win + R
              </kbd>
              , escribe{" "}
              <code className="bg-gray-800 px-1 rounded">
                %appdata%\.minecraft
              </code>{" "}
              y presiona Enter. Si no existe la carpeta{" "}
              <code className="bg-gray-800 px-1 rounded">mods</code>, créala.
            </p>
            <p>
              Puedes jugar con una cuenta <strong>Minecraft Premium</strong> o
              usar un launcher gratuito compatible con Fabric y mods.
            </p>
            <p>
              Recuerda siempre mantener tu versión de Minecraft y Fabric
              actualizadas para evitar conflictos.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
