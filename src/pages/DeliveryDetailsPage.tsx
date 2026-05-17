import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeliveryDetails } from '../hooks/useDeliveryDetails';

const DeliveryDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { delivery, loading, error } = useDeliveryDetails(id || '');

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6'>
        <p className='text-gray-600'>Carregando detalhes da entrega...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 sm:p-6'>
        <p className='text-red-500 mb-4'>Erro: {error}</p>
        <button
          onClick={() => navigate(-1)} // Go back to previous page
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Voltar
        </button>
      </div>
    );
  }

  if (!delivery) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6'>
        <p className='text-gray-600'>Entrega não encontrada.</p>
        <button
          onClick={() => navigate(-1)} // Go back to previous page
          className='ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4 sm:p-6'>
      <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Detalhes da Entrega</h1>
      <div className='bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md mx-auto'>
        <div className='mb-4'>
          <p className='text-gray-700 font-semibold'>Cliente:</p>
          <p className='text-gray-900'>{delivery.clientName}</p>
        </div>
        <div className='mb-4'>
          <p className='text-gray-700 font-semibold'>Endereço:</p>
          <p className='text-gray-900'>{delivery.fullAddress}</p>
        </div>
        {delivery.clientPhone && (
          <div className='mb-4'>
            <p className='text-gray-700 font-semibold'>Telefone:</p>
            <a href={`tel:${delivery.clientPhone}`} className='text-blue-500 hover:underline'>
              {delivery.clientPhone}
            </a>
          </div>
        )}
        <div className='mb-4'>
          <p className='text-gray-700 font-semibold'>Status:</p>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${delivery.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : delivery.status === 'out-for-delivery' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
          >
            {delivery.status.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
          </span>
        </div>
        <button
          onClick={() => {
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(delivery.fullAddress)}`;
            window.open(googleMapsUrl, '__blank');
          }}
          className='mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
        >
          Abrir Rota no Maps
        </button>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(delivery.fullAddress);
              alert('Endereço copiado para a área de transferência!');
            } catch (err) {
              console.error('Falha ao copiar o endereço:', err);
              alert('Não foi possível copiar o endereço. Por favor, copie manualmente.');
            }
          }}
          className='mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
        >
          Copiar Endereço
        </button>
        <button
          onClick={() => navigate(-1)}
          className='mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
        >
          Voltar para o Dashboard
        </button>
      </div>
    </div>
  );
};

export default DeliveryDetailsPage;
