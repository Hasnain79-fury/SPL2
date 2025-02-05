// components/auth/AuthGuard.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole?: 'user' | 'admin'
) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();
    const { user, isAuthenticated } = useSelector(
      (state: RootState) => state.auth
    );

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        router.push('/unauthorized');
      }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated) {
      return <div>{BANGLA_TEXT.common.loading}</div>;
    }

    return <WrappedComponent {...props} />;
  };
}
