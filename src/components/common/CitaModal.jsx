import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

const CitaModal = ({ isOpen, onClose }) => {
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const [correo, setCorreo] = useState('');

    if (!isOpen) return null;

    const phoneNumber = "525578343150";
    const message = `Hola, me interesa agendar una cita para el servicio de diseño de recintos y aviarios.\n\nMis datos:\n- Nombre: ${nombre}\n- Número: ${numero}\n- Correo: ${correo}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const isFormValid = nombre.trim() !== '' && numero.trim() !== '' && correo.trim() !== '';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Background Transparente con Blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose}></div>

            <div className="relative w-full max-w-[1100px] max-h-[90vh] rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">

                {/* Close Button Mobile (Absolute) */}
                <button
                    onClick={onClose}
                    className="md:hidden absolute top-4 right-4 z-20 p-2 bg-black/20 backdrop-blur-sm hover:bg-[#E11D48] text-white rounded-full transition-colors flex items-center justify-center shadow-sm"
                >
                    <X size={20} />
                </button>

                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 h-[200px] sm:h-[250px] md:h-auto flex-shrink-0 relative bg-gray-200">
                    {/* La imagen que pondrás en public después */}
                    <img
                        src={`${import.meta.env.BASE_URL}b2.png`}
                        alt="Diseño de recintos y aviarios"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side - Content */}
                <div className="w-full md:w-1/2 bg-[#008F24] p-5 sm:p-8 md:p-12 flex flex-col flex-1 overflow-y-auto relative">

                    {/* Close Button Desktop */}
                    <button
                        onClick={onClose}
                        className="hidden md:flex absolute top-6 right-6 p-2 bg-white/10 hover:bg-[#E11D48] text-white rounded-full transition-colors items-center justify-center group z-10"
                    >
                        <X size={24} className="group-hover:text-white transition-colors" />
                    </button>

                    <h2 className="text-xl sm:text-2xl md:text-[28px] font-black text-white uppercase tracking-wide font-['Inter'] mb-3 md:mb-6 pr-6 md:pr-8 leading-tight">
                        EL ESPACIO SOÑADO PARA TUS AVES
                    </h2>

                    <p className="text-white/90 mb-4 md:mb-6 text-sm md:text-base leading-relaxed hidden sm:block">
                        Cada ave merece un espacio funcional, seguro y enriquecedor. Nuestro servicio especializado va más allá de la simple decoración; creamos un entorno adaptado a las necesidades específicas de cada especie.
                    </p>

                    <p className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">
                        ¿Por qué elegir nuestro servicio?
                    </p>

                    <ul className="space-y-2 md:space-y-3 mb-5 md:mb-6 flex-1 text-white/90 text-sm md:text-base list-disc pl-5">
                        <li className="pl-1">
                            <span className="font-bold text-white">Análisis y Planificación:</span> Consideramos el comportamiento, la seguridad y la funcionalidad del espacio adaptado a cada especie.
                        </li>
                        <li className="pl-1">
                            <span className="font-bold text-white">Elementos a Medida:</span> Cuidamos cada detalle: distribución, durabilidad de materiales, vegetación y zonas de descanso.
                        </li>
                        <li className="pl-1">
                            <span className="font-bold text-white">Servicio Profesional:</span> Diseño independiente para garantizar un trabajo detallado y personalizado.
                        </li>
                    </ul>

                    {/* Formulario */}
                    <div className="space-y-2.5 md:space-y-3 mb-5 md:mb-6">
                        <input
                            type="text"
                            placeholder="Nombre completo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full px-4 py-2 md:py-2.5 rounded-xl text-sm md:text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E11D48] bg-white/95 shadow-sm"
                            required
                        />
                        <div className="flex flex-col md:flex-row gap-2.5 md:gap-3">
                            <input
                                type="tel"
                                placeholder="Teléfono"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                className="w-full md:w-1/2 px-4 py-2 md:py-2.5 rounded-xl text-sm md:text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E11D48] bg-white/95 shadow-sm"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="w-full md:w-1/2 px-4 py-2 md:py-2.5 rounded-xl text-sm md:text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E11D48] bg-white/95 shadow-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Botón de WhatsApp - Rojo para contrastar y mantener el estilo de la imagen */}
                    <button
                        onClick={() => {
                            if (!isFormValid) {
                                alert('Por favor, llena todos los campos para continuar.');
                                return;
                            }
                            window.open(whatsappUrl, '_blank');
                        }}
                        className={`w-full md:w-fit mt-auto flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-full transition-all duration-300 font-semibold text-base md:text-lg ${isFormValid
                            ? 'bg-[#E11D48] hover:bg-[#BE123C] text-white hover:shadow-lg hover:scale-[1.02] cursor-pointer'
                            : 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-80'
                            }`}
                    >
                        <MessageCircle size={20} className="md:w-[22px] md:h-[22px]" />
                        Agendar Cita
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CitaModal;
