import React from 'react';

const NewHomePromo = () => {
    return (
        <div className="relative w-full h-[400px] md:h-[626px] mt-6 md:mt-8">
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
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h2 className="font-sans text-[24px] md:text-[32px] leading-[30px] md:leading-[39px] text-white font-normal mb-[16px] md:mb-[20px] max-w-[90%] md:max-w-none">
                    UN NUEVO HOGAR ESTA ESPERANDO
                </h2>

                <button className="w-[180px] md:w-[200px] h-[40px] bg-brand-green rounded-[35px] flex items-center justify-center transition-transform hover:scale-105">
                    <span className="font-sans text-[14px] md:text-[16px] leading-[19px] text-white font-normal">
                        Cotizar aviario
                    </span>
                </button>
            </div>
        </div >
    );
};

export default NewHomePromo;
