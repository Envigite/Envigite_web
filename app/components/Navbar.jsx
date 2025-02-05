import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isAffix, setIsAffix] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsAffix(true);
      } else {
        setIsAffix(false);
      }
    };

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

  // Función para manejar el clic en el logo
  const handleLogoClick = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del enlace
    const logo = e.currentTarget.querySelector("img");
    logo.classList.add("animate-pulse"); // Aplica la animación de pulso
    setTimeout(() => {
      logo.classList.remove("animate-pulse"); // Elimina la animación después de 500ms
      window.location.href = "#"; // Devuelve al inicio
    }, 250); // Duración de la animación
  };

  return (
    <div>
      <nav
        className={`nav fixed w-full z-50 transition-all duration-400 ease-in-out ${
          isAffix ? "bg-black py-4" : "py-5"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="logo">
              <a href="#" onClick={handleLogoClick}>
                <img
                  src="/images/logoInvertido.png"
                  alt="Logo"
                  className="h-12 transition-all duration-400 ease-in-out"
                  style={{ transform: isActive ? "translateY(0)" : "translateY(0)" }}
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
                    href="#about"
                    className="text-white text-xl hover:text-green-400"
                    onClick={() => setIsActive(false)}
                  >
                    AboutMe
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="text-white text-xl hover:text-green-400"
                    onClick={() => setIsActive(false)}
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#portfolio"
                    className="text-white text-xl hover:text-green-400"
                    onClick={() => setIsActive(false)}
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="#experience"
                    className="text-white text-xl hover:text-green-400"
                    onClick={() => setIsActive(false)}
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-white text-xl hover:text-green-400"
                    onClick={() => setIsActive(false)}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Botón de menú (hamburguesa o "X") */}
            <div
              className="navTrigger lg:hidden z-50"
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

      {/* Sección con la imagen de fondo */}
      <div>
  {/* Header con imagen de fondo */}
  <section
    className="home h-[40vh] lg:h-[80vh] bg-cover bg-center relative"
    style={{
      backgroundImage: "url(/images/header.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Texto en PC (visible solo en pantallas grandes) */}
    <div className="hidden lg:flex items-center justify-end h-full">
      <div className="text-container max-w-3xl p-8 pr-12 pl-8 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Hola, soy Benjamín
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          Bienvenido a mi página web. Soy un apasionado desarrollador de software, especializado en crear experiencias digitales únicas y escalables. En esta página encontrarás más sobre mis proyectos y habilidades.
        </p>
        <p className="text-xl md:text-2xl">
          En la sección "Sobre mí" podrás conocerme mejor. ¡Espero que disfrutes tu visita!
        </p>
      </div>
    </div>

    {/* Imagen en móvil y tablet (visible solo en pantallas pequeñas y medianas) */}
    <img
  src="/images/tito.jpg"
  alt="Profile"
  className="block lg:hidden absolute top-1/2 transform -translate-y-1/2 w-36 h-36 top-1/2 right-[30%] transform -translate-y-1/2 md:w-48 md:h-48 md:right-[20%]
             rounded-full border-2 border-white"
  style={{
    right: "15%", // Ajusta este valor para moverla a la derecha (ej: "20%", "40%", etc.)
    // left: "20%", // Usa esta propiedad si quieres moverla a la izquierda
  }}
/>
  </section>

  {/* Texto en móvil y tablet (visible solo en pantallas pequeñas y medianas) */}
  <section className="lg:hidden bg-white p-8">
    <div className="text-container max-w-3xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-4">
        Hola, soy Benjamín
      </h1>
      <p className="text-xl mb-6">
        Bienvenido a mi página web. Soy un apasionado desarrollador de software, especializado en crear experiencias digitales únicas y escalables. En esta página encontrarás más sobre mis proyectos y habilidades.
      </p>
      <p className="text-xl">
        En la sección "Sobre mí" podrás conocerme mejor. ¡Espero que disfrutes tu visita!
      </p>
    </div>
  </section>

  {/* Contenido adicional */}
</div>

      {/* Contenido adicional */}
    
    </div>
  );
};

export default Navbar;