import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/features/shared/components/ui/select"
import { Equipment } from "@/utils/types.tsx"

type EquipmentSelectProps = {
    value: Equipment
    onChange: (value: Equipment) => void
    label: string
}

export function EquipmentSelect({ value, onChange, label }: EquipmentSelectProps) {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-full border-[#900020] focus:border-[#DC143C]">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={Equipment.SELECT} disabled>
                    {label}
                </SelectItem>
                {Object.values(Equipment)
                    .filter(equipment => equipment !== Equipment.SELECT)
                    .map((equipment) => (
                        <SelectItem key={equipment} value={equipment}>
                            {equipment.replace(/_/g, ' ')}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    )
}