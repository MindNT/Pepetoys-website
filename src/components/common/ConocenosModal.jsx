import React from 'react';
import { X, FileText } from 'lucide-react';

const ConocenosModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Background Transparente con Blur */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose}></div>
            
            <div className="relative w-full max-w-[1200px] h-[90vh] flex flex-col bg-white rounded-[24px] shadow-lg overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between p-4 md:p-6 border-b border-gray-100 bg-white shadow-sm z-10">
                    <h2 className="text-[22px] md:text-3xl font-black text-[#008F24] uppercase tracking-wide font-['Inter'] flex items-center gap-2">
                        <FileText className="text-[#008F24] w-6 h-6 md:w-8 md:h-8" />
                        Quiénes Somos
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-gray-100 hover:bg-[#E11D48] hover:text-white rounded-full transition-colors flex items-center justify-center group"
                    >
                        <X size={24} className="text-gray-600 group-hover:text-white transition-colors" />
                    </button>
                </div>

                {/* Content - PDF Viewer */}
                <div className="flex-1 bg-gray-50/50 w-full h-full p-2 md:p-6 overflow-hidden">
                    {/* Object se adapta mejor en algunos móviles que iframe, con fallback al enlace */}
                    <object 
                        data={`${import.meta.env.BASE_URL}CONOCENOS .pdf#view=FitH`}
                        type="application/pdf"
                        className="w-full h-full rounded-xl border border-gray-200 shadow-inner"
                    >
                        <iframe 
                            src={`${import.meta.env.BASE_URL}CONOCENOS .pdf#view=FitH`} 
                            title="Conócenos PDF"
                            className="w-full h-full rounded-xl border border-gray-200 shadow-inner"
                        >
                            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                                <p className="mb-4 text-gray-700">Tu navegador no soporta la visualización integrada de PDF.</p>
                                <a 
                                    href={`${import.meta.env.BASE_URL}CONOCENOS .pdf`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-[#008F24] hover:bg-[#007520] text-white px-6 py-3 rounded-full transition-colors font-semibold"
                                >
                                    Descargar / Abrir PDF
                                </a>
                            </div>
                        </iframe>
                    </object>
                </div>
            </div>
        </div>
    );
};

export default ConocenosModal;
