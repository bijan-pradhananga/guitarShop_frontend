'use client'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { loginAdmin } from '@/lib/features/admin';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await dispatch(loginAdmin({ email, password }))
        if (res.payload.success) {
            router.push('/admin/dashboard')
        } else {
            alert('Invalid Email Or Password');
        }
    };

    return (
        <section className="h-screen grid place-items-center md:block bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full md:w-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Admin Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-500 hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                                Log in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default LoginForm;
