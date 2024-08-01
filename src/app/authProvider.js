'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/lib/features/user';

const withAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const router = useRouter();
        const dispatch = useDispatch();
        const { data } = useSelector((state) => state.user);

        const handleAuth = async () => {
            const res = await dispatch(checkAuth());
            if (!res.payload.success) {
                router.push('/login');
            }
        }
        useEffect(() => {
            handleAuth()
        }, [dispatch]);

        return data ? <WrappedComponent {...props} /> : null;
    };

    return Wrapper;
};

export default withAuth;
