'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkAdminAuth } from '@/lib/features/admin';

const withAdminAuth = (WrappedComponent) => {
    const Wrapper = (props) => {
        const router = useRouter();
        const dispatch = useDispatch();
        const { data, error } = useSelector((state) => state.admin);

        const handleAuth = async () => {
            const res = await dispatch(checkAdminAuth());
            if (!res.payload.success) {
                router.push('/adminLogin');
            }
        }
        useEffect(() => {
            handleAuth()
        }, [dispatch]);

        return data ? <WrappedComponent {...props} /> : null;
    };

    return Wrapper;
};

export default withAdminAuth;
