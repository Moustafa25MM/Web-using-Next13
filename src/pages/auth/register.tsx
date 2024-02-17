import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Register = () => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-md w-full space-y-8'>
        <h1 className='mt-6 text-center text-3xl font-extrabold text-blue-900'>
          Welcome to my Next.js Todo app!
        </h1>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Register your account
          </h2>
        </div>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await auth?.register(values.name, values.email, values.password);
              toast.success('Registration successful!');
              router.push('/auth/login');
            } catch (error: any) {
              if (error.response.status === 409) {
                toast.error('Registration failed: Email already Exists ');
              } else {
                toast.error('Registration failed');
              }
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='mt-8 space-y-6'>
              <div className='rounded-md shadow-sm -space-y-px'>
                <div>
                  <Field
                    name='name'
                    type='text'
                    placeholder='Name'
                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  />
                  <ErrorMessage
                    name='name'
                    component='div'
                    className='text-red-500 text-xs italic'
                  />
                </div>
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
                  {isSubmitting ? 'Please wait...' : 'Sign Up'}
                </button>
              </div>
              <div className='mt-2 text-center'>
                <p className='text-gray-600'>
                  Already have an account?{' '}
                  <a
                    href='/auth/login'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Log in
                  </a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
