import { Link, useLocation, useNavigate } from "react-router-dom"
import { HomeIcon, DumbbellIcon, UtensilsIcon, UserIcon, SettingsIcon, LogOutIcon } from "./icons"
import { Logo } from "@/features/shared/components/ui/logo"

type MenuItem = {
    icon: React.FC
    label: string
    href: string
}

const menuItems: MenuItem[] = [
    { icon: HomeIcon, label: 'Home', href: '/' },
    { icon: DumbbellIcon, label: 'Workouts', href: '/workout' },
    { icon: UtensilsIcon, label: 'Meals', href: '/meals' },
    { icon: UserIcon, label: 'Profile', href: '/profile' },
    { icon: SettingsIcon, label: 'Admin Center', href: '/admin' },
]

export function Sidebar(): JSX.Element {
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        navigate('/signin')
    }

    return (
        <aside className="w-64 h-screen bg-[#900020] text-[#E9DDD4] flex flex-col border-r border-[#E9DDD4]">
            <div className="p-6 flex justify-center">
                <Logo />
            </div>

            <nav className="flex-1 px-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#DC143C] transition-colors ${
                                    location.pathname === item.href ? 'bg-[#DC143C]' : ''
                                }`}
                            >
                                <item.icon />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-6 border-t border-[#E9DDD4]/10">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-[#DC143C] transition-colors"
                >
                    <LogOutIcon />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    )
}