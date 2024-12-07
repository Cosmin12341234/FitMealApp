import { Label } from "@/features/shared/components/ui/label"
import { Checkbox } from "@/features/workoutGenerator/components/ui/checkBox"
import { Equipment } from '@/utils/types'

interface EquipmentSelectorProps {
    selectedEquipment: Equipment[]
    onEquipmentChange: (equipment: Equipment[]) => void
}

export function EquipmentSelector({ selectedEquipment, onEquipmentChange }: EquipmentSelectorProps) {
    const toggleEquipment = (equipment: Equipment) => {
        onEquipmentChange(
            selectedEquipment.includes(equipment)
                ? selectedEquipment.filter(e => e !== equipment)
                : [...selectedEquipment, equipment]
        )
    }

    const handleSelectAll = (checked: boolean) => {
        onEquipmentChange(checked ? Object.values(Equipment) : [])
    }

    return (
        <div className="mb-6">
            <Label>Equipment</Label>
            <div className="flex items-center space-x-2 mt-2 mb-2">
                <Checkbox
                    id="select-all"
                    checked={selectedEquipment.length === Object.values(Equipment).length}
                    onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                />
                <label
                    htmlFor="select-all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Select All Equipment
                </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {Object.values(Equipment).map((equipment) => (
                    <div key={equipment} className="flex items-center space-x-2">
                        <Checkbox
                            id={equipment}
                            checked={selectedEquipment.includes(equipment)}
                            onCheckedChange={() => toggleEquipment(equipment)}
                        />
                        <label
                            htmlFor={equipment}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {equipment.replace(/_/g, ' ')}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}