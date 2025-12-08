import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-brand-green-dark text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-2xl font-bold font-sans">Pepe's Toys</h3>
                        <p className="text-sm text-gray-300 font-sans">
                            Alegría natural para tus aves. Diseñamos espacios que inspiran vida.
                        </p>
                    </div>

                    {/* Links Column */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-bold text-lg font-sans">Explorar</h4>
                        <ul className="space-y-2 text-sm text-gray-300 font-sans">
                            <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Nuestros Productos</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-bold text-lg font-sans">Contacto</h4>
                        <ul className="space-y-2 text-sm text-gray-300 font-sans">
                            <li>info@pepestoys.com</li>
                            <li>+52 55 1234 5678</li>
                            <li>Ciudad de México, México</li>
                        </ul>
                    </div>

                    {/* Newsletter / Social */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-bold text-lg font-sans">Síguenos</h4>
                        <div className="flex space-x-4">
                            {/* Dummy Social Icons */}
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-brand-green transition-colors cursor-pointer">
                                <span className="text-xs">FB</span>
                            </div>
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-brand-green transition-colors cursor-pointer">
                                <span className="text-xs">IG</span>
                            </div>
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-brand-green transition-colors cursor-pointer">
                                <span className="text-xs">TW</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-400 font-sans">
                    © {new Date().getFullYear()} Pepe's Toys. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
