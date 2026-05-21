import React, { useState } from 'react';
import { MousePointer2, X } from 'lucide-react';
import africanGrey from '../../assets/african_grey_pointing.png';

const BirdSpeechSection = () => {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <>
        <section className="w-full bg-white py-6 md:py-10">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
                <div className="flex items-center gap-4 md:gap-6">
                    {/* African Grey Character */}
                    <div className="flex-shrink-0">
                        <img
                            src={africanGrey}
                            alt="Loro guía"
                            className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] object-contain"
                        />
                    </div>

                    {/* Speech Bubble */}
                    <div className="relative">
                        <div
                            onClick={() => setShowVideo(true)}
                            className="bg-[#283A5B] rounded-full px-6 md:px-8 py-3 md:py-4 flex items-center gap-3 shadow-md cursor-pointer hover:bg-[#1e2e4a] active:scale-95 transition-all duration-200"
                        >
                            <span className="text-white font-sans font-semibold text-base md:text-lg lg:text-xl">
                                Como ambientar una jaula ?
                            </span>
                            <MousePointer2 size={20} className="text-white md:w-6 md:h-6" />
                        </div>
                        
                        {/* Triangle pointer for speech bubble */}
                        <div 
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0"
                            style={{
                                borderTop: '8px solid transparent',
                                borderBottom: '8px solid transparent',
                                borderRight: '10px solid #283A5B',
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>

        {/* YouTube Video Modal */}
        {showVideo && (
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                onClick={() => setShowVideo(false)}
            >
                <div
                    className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setShowVideo(false)}
                        className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                        aria-label="Cerrar video"
                    >
                        <X size={18} />
                    </button>

                    {/* 16:9 responsive iframe */}
                    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/AXKTJ-Mu9io?autoplay=1"
                            title="Como ambientar una jaula"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default BirdSpeechSection;
