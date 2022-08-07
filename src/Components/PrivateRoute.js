import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useGoogleAuth } from '../Contexts/GoogleAuthContext';
import { AdminEmails } from '../Data/AdminEmails';

export const PrivateRoute = ({ children }) => {
  const { currentUser, googleSignOut } = useGoogleAuth();
  const [adminEmails] = useState(AdminEmails);
  // return children;
  return currentUser && adminEmails.includes(currentUser.email)
    ? children
    : googleSignOut() && <Navigate to='/login' />;
};
