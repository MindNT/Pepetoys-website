import React from 'react';

const NewHomePromo = () => {
    return (
        <div className="relative w-full h-[626px] mt-8">{/* Reduced mt-[100px] to mt-8 */}
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${import.meta.env.BASE_URL}77ff67b37e5c7e80d2b273048467c66a82be04b2.jpg)`,
                }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 w-full h-full bg-black/50"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <h2 className="font-sans text-[32px] leading-[39px] text-white font-normal mb-[20px]">
                    UN NUEVO HOGAR ESTA ESPERANDO
                </h2>

                <button className="w-[200px] h-[40px] bg-brand-green rounded-[35px] flex items-center justify-center transition-transform hover:scale-105">
                    <span className="font-sans text-[16px] leading-[19px] text-white font-normal">
                        Cotizar aviario
                    </span>
                </button>
            </div>
        </div >
    );
};

export default NewHomePromo;
