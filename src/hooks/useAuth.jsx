import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

export const useAuth = () => {
    const authInfo = useContext(AuthContext); // ✅ useContext
    return authInfo;
};

export default useAuth;
