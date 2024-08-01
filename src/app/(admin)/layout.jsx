'use client'
import AdminHeaderComponent from "@/components/Design/AdminComponent/AdminHeaderComponent";
import SidebarComponent from "@/components/Design/AdminComponent/SidebarComponent";
import withAdminAuth from "../adminAuthProvider";

const RootLayoutComponent = ({ children }) => {
    return (
        <>
            <SidebarComponent />
            <div className="sm:ml-64 dark:bg-gray-900">
                <AdminHeaderComponent />
                <div className="px-8 py-5">
                    {children}
                </div>
            </div>
        </>
    );
};

const RootLayout = withAdminAuth(RootLayoutComponent);

export default RootLayout;
