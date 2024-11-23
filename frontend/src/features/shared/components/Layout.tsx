import { Sidebar } from "@/features/shared/components/ui/sideBard"

interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen bg-[#E9DDD4] overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto p-8 text-[#900020]">
                {children}
            </main>
        </div>
    )
}