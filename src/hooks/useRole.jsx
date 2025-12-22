import React from 'react';
import useAuth from './useAuth';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user, loading } = useAuth()


    const { data: role, isLoading: isRoleLoading } = useQuery({
        enabled:!loading && !!user?.email,
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const{data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/role/${user?.email}`);
            return data.role

        }
    })
    return {role,isRoleLoading}

};

export default useRole;