import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Ticket = () => {
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    // Break out of iframe if MercadoPago redirects within it
    if (window.top !== window.self) {
      window.top.location.href = window.location.href;
      return;
    }

    const savedTicket = localStorage.getItem('pepetoys_ticket');
    if (savedTicket) {
      try {
        setTicketData(JSON.parse(savedTicket));
      } catch (e) {
        console.error("Error parsing ticket data", e);
      }
    }
  }, []);

  if (!ticketData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No se encontró información del pedido.</h2>
        <Link to="/" className="px-6 py-3 bg-[#1A237E] text-white rounded-lg font-medium hover:bg-[#121858] transition-colors">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  const { orderCode, customerName, phone, items, totalAmount, waUrl, isShippingPending } = ticketData;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8 font-['Inter']">
      <div className="bg-white rounded-2xl md:rounded-[15px] w-full max-w-[600px] shadow-lg overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-[#1A237E] p-6 text-center text-white relative">
          <Link to="/" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle size={36} className="text-white" strokeWidth={2} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">¡Gracias por tu compra!</h1>
          <p className="text-white/80 text-sm">Tu pedido ha sido procesado exitosamente</p>
        </div>

        <div className="p-6 md:p-8">
          {/* Order Details Card */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 md:p-6 mb-6">
            
            {/* Order Code */}
            <div className="mb-4 pb-4 border-b border-gray-200 text-center">
              <p className="text-xs md:text-sm text-gray-500 mb-1 uppercase tracking-wider font-semibold">Código de Pedido</p>
              <p className="text-xl md:text-2xl font-black text-[#1A237E]">{orderCode}</p>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Nombre</p>
                <p className="text-sm md:text-base font-medium text-gray-800">{customerName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Teléfono</p>
                <p className="text-sm md:text-base font-medium text-gray-800">{phone}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-4">
                <Package size={18} className="text-[#1A237E]" />
                <p className="text-sm md:text-base font-bold text-gray-800">Resumen de Productos</p>
              </div>
              <div className="space-y-3">
                {items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-start text-sm">
                    <div className="flex-1 pr-4">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Cantidad: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900 whitespace-nowrap">
                      ${(item.priceNumber * item.quantity).toFixed(2)} MXN
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 mt-4 border-t border-gray-300">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-600 font-medium">Total a Pagar</p>
                  {isShippingPending && <p className="text-xs text-amber-600 font-medium">*Envío pendiente</p>}
                </div>
                <p className="text-2xl md:text-3xl font-black text-[#008F24]">
                  ${totalAmount?.toFixed(2)} MXN
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <p className="text-center text-sm text-gray-600 mb-2">
              Para dar un mejor seguimiento a tu pedido, por favor envíanos tu ticket por WhatsApp.
            </p>
            <a 
              href={waUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              Compartir Ticket en WhatsApp
            </a>
            
            <Link 
              to="/"
              className="w-full py-4 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-bold text-base rounded-xl shadow-sm flex items-center justify-center transition-all active:scale-[0.98]"
            >
              Volver a la Tienda
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Ticket;
