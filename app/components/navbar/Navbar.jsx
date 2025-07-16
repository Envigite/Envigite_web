import { useState, useEffect, useRef } from "react";
import HeaderText from "./HeaderText";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isAffix, setIsAffix] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
  const handleScroll = () => setIsAffix(window.scrollY > 50);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsActive(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  const handleLogoClick = (e) => {
  e.preventDefault();
  const logo = e.currentTarget.querySelector("img");
  if (!logo) return;

  logo.classList.add("soft-ping");
  window.scrollTo({ top: 0, behavior: "smooth" });
  
  setTimeout(() => {
    logo.classList.remove("soft-ping");
  }, 900);
};


  return (
    //Barra de navegación
    <div>
      <nav
        className={`nav fixed w-full z-50 transition-all duration-400 ease-in-out ${
          isAffix ? "bg-black py-3" : "py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="logo">
              <a href="#" onClick={handleLogoClick}>
                <img
                  src="/images/logoInvertido.webp"
                  alt="Logo"
                  className="h-12 transition-all duration-400 ease-in-out"
                />
              </a>
            </div>

            {/* Menú */}
            <div
              ref={menuRef}
              className={`main_list fixed lg:relative top-0 right-0 w-[30%] lg:w-auto h-screen lg:h-auto bg-black lg:bg-transparent z-40 transform transition-all duration-500 ease-in-out ${
                isActive ? "translate-x-0" : "translate-x-full lg:translate-x-0"
              } lg:block`}
              id="mainListDiv"
            >
              <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 pt-20 lg:pt-0 pl-4 lg:pl-0">
                <li>
                  <a
                    href="#skills"
                    className="text-white text-xl hover:text-green-400"
                    onClick={() => setIsActive(false)}
                  >
                    Habilidades
                  </a>
                </li>
                <li>
                  <a
                    href="#portfolio"
                    className="text-white text-xl hover:text-green-400"
                    onClick={() => setIsActive(false)}
                  >
                    Portafolio
                  </a>
                </li>
                <li>
                  <a
                    href="#experience"
                    className="text-white text-xl hover:text-green-400"
                    onClick={() => setIsActive(false)}
                  >
                    Experiencia
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-white text-xl hover:text-green-400"
                    onClick={() => setIsActive(false)}
                  >
                    Sobre mi
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-white text-xl hover:text-green-400"
                    onClick={() => setIsActive(false)}
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Botón de menú (hamburguesa o "X") */}
            <div
              className="navTrigger lg:hidden z-50"
              aria-expanded={isActive}
              onClick={(e) => {
                e.stopPropagation();
                setIsActive(!isActive);
              }}
            >
              <div
                className={`bar bg-white h-1 w-6 transition-all duration-400 ease-in-out ${
                  isActive ? "rotate-45 translate-y-2" : ""
                }`}
              ></div>
              <div
                className={`bar bg-white h-1 w-6 my-1 transition-all duration-400 ease-in-out ${
                  isActive ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`bar bg-white h-1 w-6 transition-all duration-400 ease-in-out ${
                  isActive ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Fondo oscuro semitransparente */}
      {isActive && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsActive(false)}
        ></div>
      )}
      <div>
        
        {/* Header con imagen de fondo */}
        <section
          className="home h-[40vh] lg:h-[80vh] bg-cover bg-center relative"
          style={{ backgroundImage: "url(/images/header.webp)" }}
        >
          {/* Texto en PC (visible solo en pantallas grandes) */}
          <div className="hidden lg:flex items-center justify-end h-full text-white text-Left">          
            <HeaderText />
          </div>
        
          {/* Imagen en móvil y tablet (visible solo en pantallas pequeñas y medianas) */}
          <img
            src="/images/perfil.webp"
            alt="Profile"
            className="block lg:hidden absolute top-1/2 md:top-1/3 -translate-y-1/2 w-36 h-36 md:w-48 md:h-48 rounded-full border-2 border-white transition-opacity duration-500 opacity-0 animate-fade-in"
            style={{ right: "7%" }} // Ajusta este valor según sea necesario
          />
        </section>
          
        {/* Texto en móvil y tablet (visible solo en pantallas pequeñas y medianas) */}
        <section className="lg:hidden bg-gradient-to-b from-gray to-white p-4 text-gray-800 flex justify-center text-center">
          <HeaderText />
        </section>
      </div>
    </div>
  );
};

export default Navbar;