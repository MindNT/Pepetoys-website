import React from 'react';
import { MousePointer2 } from 'lucide-react';
import africanGrey from '../../assets/african_grey_pointing.png';

const BirdSpeechSection = () => {
    return (
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
                        <div className="bg-[#283A5B] rounded-full px-6 md:px-8 py-3 md:py-4 flex items-center gap-3 shadow-md">
                            <span className="text-white font-satisfy text-lg md:text-2xl lg:text-2xl">
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
    );
};

export default BirdSpeechSection;

