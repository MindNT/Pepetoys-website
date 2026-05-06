import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full bg-brand-green-dark text-white py-6 md:py-8">
            <div className="container mx-auto px-6 md:px-12 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                    {/* Brand Column */}
                    <div className="flex flex-col space-y-2">
                        <h3 className="text-lg md:text-xl font-bold font-sans">Pepe's Toys</h3>
                        <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed">
                            Alegría natural para tus aves. Diseñamos espacios que inspiran vida.
                        </p>
                    </div>

                    {/* Links Column */}
                    <div className="flex flex-col space-y-2">
                        <h4 className="font-bold text-sm md:text-base font-sans">Explorar</h4>
                        <ul className="space-y-1 text-xs md:text-sm text-gray-300 font-sans">
                            <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Nuestros Productos</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="font-bold text-sm md:text-base font-sans text-white">Contacto</h4>
                        <ul className="space-y-3 text-xs md:text-sm text-gray-300 font-sans">
                            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                                <div className="bg-white/10 p-1.5 md:p-2 rounded-full group-hover:bg-[#008F24] transition-colors"><Mail size={16} /></div>
                                <span>info@pepestoys.com</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                                <div className="bg-white/10 p-1.5 md:p-2 rounded-full group-hover:bg-[#008F24] transition-colors"><Phone size={16} /></div>
                                <span>+52 55 1234 5678</span>
                            </li>
                            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                                <div className="bg-white/10 p-1.5 md:p-2 rounded-full group-hover:bg-[#008F24] transition-colors"><MapPin size={16} /></div>
                                <span>Ciudad de México, México</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / Social */}
                    <div className="flex flex-col space-y-3">
                        <h4 className="font-bold text-sm md:text-base font-sans text-white">Síguenos</h4>
                        <div className="flex space-x-4 pt-1">
                            {/* Social Icons */}
                            <div className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#008F24] hover:scale-110 transition-all duration-300 cursor-pointer shadow-sm">
                                <Facebook size={18} className="text-white" />
                            </div>
                            <div className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#008F24] hover:scale-110 transition-all duration-300 cursor-pointer shadow-sm">
                                <Instagram size={18} className="text-white" />
                            </div>
                            <div className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#008F24] hover:scale-110 transition-all duration-300 cursor-pointer shadow-sm">
                                <Twitter size={18} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-center text-[10px] md:text-xs text-gray-400 font-sans">
                    © {new Date().getFullYear()} Pepe's Toys. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
