import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await auth?.login(values.email, values.password);
              toast.success('Login successful!');
              router.push('/todos');
            } catch (error: any) {
              if (error.response?.status === 401) {
                toast.error('Login failed: Invalid email or password');
              } else {
                toast.error('Login failed');
              }
              console.error(error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='mt-8 space-y-6'>
              <div className='rounded-md shadow-sm -space-y-px'>
                <div>
                  <Field
                    name='email'
                    type='email'
                    placeholder='Email address'
                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='text-red-500 text-xs italic'
                  />
                </div>
                <div>
                  <Field
                    name='password'
                    type='password'
                    placeholder='Password'
                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  />
                  <ErrorMessage
                    name='password'
                    component='div'
                    className='text-red-500 text-xs italic'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {isSubmitting ? 'Please wait...' : 'Sign In'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
