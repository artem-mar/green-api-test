import React, { ReactElement } from 'react';
import {
  Routes, Route, Navigate, BrowserRouter,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './hooks';

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { loggedIn } = useAuth();

  return loggedIn ? children : <Navigate to="/login" />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
        )}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
