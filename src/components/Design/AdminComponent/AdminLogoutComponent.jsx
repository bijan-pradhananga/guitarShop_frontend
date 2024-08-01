'use client'
import { logoutAdmin } from "@/lib/features/admin"
import { useAppDispatch } from "@/lib/hooks"
import { useRouter } from 'next/navigation';

const AdminLogoutComponent = () => {
    const dispatch = useAppDispatch()
    
    const router = useRouter();
    const logout = async () => {
        const res = await dispatch(logoutAdmin())
        if (res.payload.success) {
            router.push('/adminLogin')
        }
    }
    return (
        <span
            href="#" onClick={logout}
            className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
            <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101" id="user" aria-hidden="true" fill="currentColor">
                <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path>
            </svg>
            <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
        </span>
    )
}

export default AdminLogoutComponent