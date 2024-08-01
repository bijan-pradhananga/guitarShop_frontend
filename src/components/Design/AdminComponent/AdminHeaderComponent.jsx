import { ThemeSwitcher } from "@/components/UI/ThemeSwitch";

const AdminHeaderComponent = () => {
    return (
        <div className="w-full bg-gray-100 dark:bg-gray-900 dark:border-b border-gray-700 py-4 px-8 flex justify-end gap-3">
            <div className="text-3xl grid items-center">
                <ThemeSwitcher />
            </div>
            <div className="rounded-full aspect-square bg-gray-200 w-12"></div>
        </div>
    )
}

export default AdminHeaderComponent