import React, { useState } from 'react';
import { X, ImageIcon } from 'lucide-react';

// Use Vite's glob to automatically detect all files in the directory at build/dev time
const rawImages = import.meta.glob('/public/mivoladera/*.{jpg,jpeg,png,webp,gif}');
const availableFilenames = Object.keys(rawImages).map(path => path.split('/').pop());

const MiVoladeraGalleryModal = ({ isOpen, onClose }) => {
    const [loadedImages, setLoadedImages] = useState([]);

    if (!isOpen) return null;

    const handleImageLoad = (filename) => {
        if (!loadedImages.includes(filename)) {
            setLoadedImages(prev => [...prev, filename]);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Background Transparente con Blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose}></div>
            
            <div className="relative w-full max-w-[1400px] h-full max-h-[90vh] flex flex-col bg-white rounded-[24px] shadow-sm overflow-hidden border border-gray-100">
                {/* Header Gallery */}
                <div className="flex-shrink-0 flex items-center justify-between p-5 md:p-6 border-b border-gray-100 bg-white">
                    <h2 className="text-[28px] md:text-3xl font-black text-[#B70F2A] uppercase tracking-wide font-['Inter']">Nuestra Voladera</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors flex items-center justify-center"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>

                {/* Content - Image Grid Layer */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 custom-scrollbar">
                    {availableFilenames.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center">
                            <ImageIcon size={64} className="text-gray-300 mb-4" />
                            <p className="text-gray-500 text-xl font-medium text-center max-w-md">
                                La galería aún está vacía.<br/>
                                <span className="text-sm mt-2 block opacity-80">Deposita cualquier cantidad de imágenes en la carpeta <span className="font-mono text-white/80">public/mivoladera/</span> y aparecerán aquí automáticamente (recarga requerida en pruebas).</span>
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
                            {availableFilenames.map(filename => (
                                <div 
                                    key={filename} 
                                    className={`w-full overflow-hidden rounded-xl flex items-center justify-center min-h-[150px]
                                    ${!loadedImages.includes(filename) ? 'bg-white/5 animate-pulse' : 'bg-transparent hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.6)] transition-all duration-300'}`}
                                >
                                    <img
                                        src={`${import.meta.env.BASE_URL}mivoladera/${filename}`}
                                        alt={`Voladera ${filename}`}
                                        onLoad={() => handleImageLoad(filename)}
                                        className={`w-full h-auto object-cover rounded-xl ${loadedImages.includes(filename) ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MiVoladeraGalleryModal;
