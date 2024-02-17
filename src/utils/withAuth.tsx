import React, {
  ComponentType,
  useEffect,
  useState,
  FC,
  ReactElement,
} from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const withAuth = <P extends {}>(WrappedComponent: ComponentType<P>): FC<P> => {
  const WithAuthComponent: FC<P> = (props: P): ReactElement | null => {
    const router = useRouter();
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (!auth?.token) {
        router.push('/auth/login');
      } else {
        setIsLoading(false);
      }
    }, [auth, router]);

    if (isLoading) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
