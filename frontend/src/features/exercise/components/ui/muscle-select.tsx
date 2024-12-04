import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/features/shared/components/ui/select"
import { Muscle } from "@/utils/types.tsx"

type MuscleSelectProps = {
    value: Muscle
    onChange: (value: Muscle) => void
    label: string
}

export function MuscleSelect({ value, onChange, label }: MuscleSelectProps) {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-full border-[#900020] focus:border-[#DC143C]">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={Muscle.SELECT} disabled>
                    {label}
                </SelectItem>
                {Object.values(Muscle)
                    .filter(muscle => muscle !== Muscle.SELECT)
                    .map((muscle) => (
                        <SelectItem key={muscle} value={muscle}>
                            {muscle.replace(/_/g, ' ')}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    )
}