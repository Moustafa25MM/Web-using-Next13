import Link from 'next/link';

export default function Custom404() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
        <p className='text-2xl font-light text-gray-600 mb-8'>
          Oops! The page you're looking for isn't here.
        </p>
        <Link
          href='/auth/register'
          className='inline-block bg-blue-500 text-white text-sm px-6 py-3 rounded shadow hover:bg-blue-600 focus:outline-none focus:shadow-outline transition-colors'
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
