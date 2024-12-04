import { Link, useLocation, useNavigate } from "react-router-dom"
import { HomeIcon, DumbbellIcon, UtensilsIcon, UserIcon, SettingsIcon, LogOutIcon } from "./icons"
import { Logo } from "@/features/shared/components/ui/logo"
import { Role } from "@/utils/types"
import { UserService } from "@/features/user/services/UserService"
import { useEffect, useState } from "react"

type MenuItem = {
    icon: React.FC
    label: string
    href: string
    roles?: Role[]
}

const menuItems: MenuItem[] = [
    { icon: HomeIcon, label: 'Home', href: '/home' },
    { icon: DumbbellIcon, label: 'Workouts', href: '/workout' },
    { icon: UtensilsIcon, label: 'Meals', href: '/meals' },
    { icon: UserIcon, label: 'Profile', href: '/profile' },
    {
        icon: SettingsIcon,
        label: 'Admin Center',
        href: '/admin',
        roles: [Role.ADMIN]
    },
]

export function Sidebar(): JSX.Element {
    const location = useLocation()
    const navigate = useNavigate()
    const [userRole, setUserRole] = useState<Role | null>(null)

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const username = localStorage.getItem('username')
                if (username) {
                    const userData = await UserService.getByUsername()
                    setUserRole(userData.role)
                }
            } catch (error) {
                console.error('Failed to fetch user role:', error)
                navigate('/signin')
            }
        }

        fetchUserRole()
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        navigate('/signin')
    }

    const filteredMenuItems = menuItems.filter(item =>
        !item.roles || (userRole && item.roles.includes(userRole))
    )

    return (
        <aside className="w-64 h-screen bg-[#900020] text-[#E9DDD4] flex flex-col border-r border-[#E9DDD4]">
            <div className="p-6 flex justify-center">
                <Logo />
            </div>

            <nav className="flex-1 px-4">
                <ul className="space-y-2">
                    {filteredMenuItems.map((item) => (
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