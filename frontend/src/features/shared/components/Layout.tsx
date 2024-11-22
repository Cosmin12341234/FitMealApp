import { Sidebar } from "@/features/shared/components/ui/sideBard.tsx";

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen bg-[#000000] overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto p-8 text-[#E9DDD4]">
                {children}
            </main>
        </div>
    );
}