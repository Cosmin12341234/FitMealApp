import { Button } from "@/features/shared/components/ui/button"
import { useNavigate } from "react-router-dom"

export function QuickActions() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/profile')
    }

    return (
        <Button
            onClick={handleClick}
            className="bg-[#900020] hover:bg-[#DC143C] text-[#E9DDD4]"
        >
            Update Weight
        </Button>
    )
}