import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import RequireAuth from './components/RequireAuth';

const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Classes = lazy(() => import('./pages/Classes'));
const Clinicians = lazy(() => import('./pages/Clinicians'));
const Profile = lazy(() => import('./pages/Profile'));
const Reminders = lazy(() => import('./pages/Reminders'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Admin = lazy(() => import('./pages/Admin'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));

const App = () => {
  return (
    <Suspense fallback={<LoadingScreen /> }>
      <Routes>
        <Route path="/" element={<Layout /> }>
          <Route index element={<Landing /> } />
          <Route path="login" element={<Login /> } />
          <Route path="register" element={<Register /> } />
          <Route path="forgot-password" element={<ForgotPassword /> } />
          <Route
            path="portal"
            element={(
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            )}
          />
          <Route
            path="portal/bookings"
            element={(
              <RequireAuth>
                <Bookings />
              </RequireAuth>
            )}
          />
          <Route
            path="portal/classes"
            element={(
              <RequireAuth>
                <Classes />
              </RequireAuth>
            )}
          />
          <Route
            path="portal/clinicians"
            element={(
              <RequireAuth>
                <Clinicians />
              </RequireAuth>
            )}
          />
          <Route
            path="portal/profile"
            element={(
              <RequireAuth>
                <Profile />
              </RequireAuth>
            )}
          />
          <Route
            path="portal/reminders"
            element={(
              <RequireAuth>
                <Reminders />
              </RequireAuth>
            )}
          />
          <Route
            path="portal/analytics"
            element={(
              <RequireAuth roles={["admin", "staff"]}>
                <Analytics />
              </RequireAuth>
            )}
          />
          <Route
            path="portal/admin"
            element={(
              <RequireAuth roles={["admin"]}>
                <Admin />
              </RequireAuth>
            )}
          />
          <Route path="help" element={<HelpCenter /> } />
          <Route path="*" element={<Navigate to="/" replace /> } />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
