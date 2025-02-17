import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { Send, Phone, Mail, MapPin, Download } from "lucide-react";
import Content from "../utils/Content";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_TEMPLATE_ID || "",
        templateParams,
        process.env.NEXT_PUBLIC_USER_ID || ""
      )
      .then(
        (result) => {
          console.log("Correo enviado:", result.text);
          setIsSubmitted(true);
          setError("");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Error al enviar el correo:", error.text);
          setError("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
        }
      );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldMap: { [key: string]: string } = {
      from_name: "name",
      from_email: "email",
      message: "message",
    };

    const stateField = fieldMap[e.target.name] || e.target.name;
    setFormData({
      ...formData,
      [stateField]: e.target.value,
    });
  };

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-12">
      {/* Sección de título y descripción */}
      <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
        <FiMail className="text-purple-600 text-4xl" />
        ¿Quieres contactarme? 📬
      </h2>
      <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-md">
        <Content>
          Estoy esperando tu mensaje. Si tienes algún proyecto en mente o
          simplemente quieres hablar sobre tecnología, ¡contáctame!
        </Content>
      </div>

      {/* Sección de contacto (formulario e información) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Información de contacto */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Información de Contacto
          </h3>
          <div className="space-y-6">
            {/* Teléfono */}
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-purple-600" />
              <a
                href="https://wa.link/1u042c"
                target="_blank"
                className="text-gray-700 hover:text-purple-700 transition-colors"
              >
                +569 7904 2073
              </a>
            </div>

            {/* Correo electrónico con enlace */}
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-purple-600" />
              <a
                href="mailto:benjacontrerasma@yahoo.com"
                className="text-gray-700 hover:text-purple-700 transition-colors"
              >
                benjacontrerasma@yahoo.com
              </a>
            </div>

            {/* Ubicación */}
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-purple-600" />
              <p>San Antonio, Chile</p>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-3">
              <FaLinkedin className="w-5 h-5 text-purple-600" />
              <a
                href="https://www.linkedin.com/in/benja-envigite/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-purple-700 transition-colors"
              >
                LinkedIn
              </a>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-3">
              <FaInstagram className="w-5 h-5 text-purple-600" />
              <a
                href="https://www.instagram.com/envigite73/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-purple-700 transition-colors"
              >
                Instagram
              </a>
            </div>

            {/* GitHub */}
            <div className="flex items-center gap-3">
              <FaGithub className="w-5 h-5 text-purple-600" />
              <a
                href="https://github.com/Envigite"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-purple-700 transition-colors"
              >
                GitHub
              </a>
            </div>

            {/* Descargar CV */}
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-purple-600" />
              <a
                href="/CV_BenjaminContreras.pdf"
                download="CV_BenjaminContreras.pdf"
                className="text-purple-600 hover:text-purple-700 transition-colors"
              >
                Descargar CV
              </a>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Envíame un mensaje</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="from_name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="from_email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            {isSubmitted && (
              <div className="bg-green-100 text-green-700 p-4 rounded-md">
                Mensaje enviado con éxito.
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
