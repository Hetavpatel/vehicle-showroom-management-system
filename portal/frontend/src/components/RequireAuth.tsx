import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from './LoadingScreen';

type RequireAuthProps = {
  children: ReactNode;
  roles?: Array<'admin' | 'staff' | 'member'>;
};

const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/portal" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
