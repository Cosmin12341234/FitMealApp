import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/features/shared/components/ui/select"
import { Difficulty } from "@/utils/types.tsx"

type DifficultySelectProps = {
    value: Difficulty
    onChange: (value: Difficulty) => void
    label: string
}

export function DifficultySelect({ value, onChange, label }: DifficultySelectProps) {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-full border-[#900020] focus:border-[#DC143C]">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={Difficulty.BEGINNER} disabled>
                    {label}
                </SelectItem>
                {Object.values(Difficulty)
                    .filter(difficulty => difficulty !== Difficulty.BEGINNER)
                    .map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                            {difficulty.replace(/_/g, ' ')}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    )
}