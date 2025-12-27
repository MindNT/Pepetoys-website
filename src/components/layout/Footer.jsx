import React from 'react';

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
                    <div className="flex flex-col space-y-2">
                        <h4 className="font-bold text-sm md:text-base font-sans">Contacto</h4>
                        <ul className="space-y-1 text-xs md:text-sm text-gray-300 font-sans">
                            <li>info@pepestoys.com</li>
                            <li>+52 55 1234 5678</li>
                            <li>Ciudad de México, México</li>
                        </ul>
                    </div>

                    {/* Newsletter / Social */}
                    <div className="flex flex-col space-y-2">
                        <h4 className="font-bold text-sm md:text-base font-sans">Síguenos</h4>
                        <div className="flex space-x-3">
                            {/* Social Icons */}
                            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-brand-green transition-colors cursor-pointer">
                                <span className="text-[10px]">FB</span>
                            </div>
                            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-brand-green transition-colors cursor-pointer">
                                <span className="text-[10px]">IG</span>
                            </div>
                            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-brand-green transition-colors cursor-pointer">
                                <span className="text-[10px]">TW</span>
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
