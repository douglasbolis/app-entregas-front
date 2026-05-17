import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Assuming React Router for navigation
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    if (!username || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await signIn({ username, password });
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (err: any) {
      setError(err.message || 'Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm'>
        <h2 className='text-2xl font-bold text-center mb-6'>Maré Manguinhos - Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
              Usuário (E-mail ou CPF)
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='username'
              type='text'
              placeholder='Seu usuário'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
              Senha
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='******************'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className='text-red-500 text-xs italic mb-4'>{error}</p>
          )}
          <div className='flex items-center justify-center'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
              type='submit'
            >
              Entrar
            </button>
          </div>
        </form>
        <div className='mt-6 text-center text-sm text-gray-500'>
          <Link to='/forgot-password' className='text-blue-500 hover:text-blue-700'>
            Esqueci minha senha
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
