"use client"

import { useState } from 'react'
import { Button } from "@/features/shared/components/ui/button"
import { Input } from "@/features/shared/components/ui/input"
import { Label } from "@/features/shared/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/features/shared/components/ui/select"

type EditableFieldProps = {
    label: string
    value: string
    onUpdate: (value: string) => void
    type?: 'text' | 'email' | 'password' | 'date' | 'number' | 'select'
    options?: { value: string; label: string }[]
}

export function EditableField({
                                  label,
                                  value,
                                  onUpdate,
                                  type = 'text',
                                  options = []
                              }: EditableFieldProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [currentValue, setCurrentValue] = useState(value)

    const handleSave = () => {
        onUpdate(currentValue)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setCurrentValue(value)
        setIsEditing(false)
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex-grow mr-4">
                <Label htmlFor={label} className="text-[#000000]">{label}</Label>
                {isEditing ? (
                    type === 'select' ? (
                        <Select
                            value={currentValue}
                            onValueChange={setCurrentValue}
                        >
                            <SelectTrigger className="mt-1 border-[#900020] focus:border-[#DC143C] text-[#000000] bg-[#E9DDD4]">
                                <SelectValue placeholder={`Select ${label}`} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        className="hover:bg-[#DC143C] hover:text-[#E9DDD4]"
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ) : (
                        <Input
                            id={label}
                            type={type}
                            value={currentValue}
                            onChange={(e) => setCurrentValue(e.target.value)}
                            className="mt-1 border-[#900020] focus:border-[#DC143C] text-[#000000] bg-[#E9DDD4]"
                        />
                    )
                ) : (
                    <div className="mt-1 text-[#000000]">
                        {type === 'password' ? '********' : value}
                    </div>
                )}
            </div>
            {isEditing ? (
                <div className="space-x-2">
                    <Button
                        onClick={handleSave}
                        className="bg-[#900020] hover:bg-[#DC143C] text-[#E9DDD4]"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-[#900020] text-[#900020] hover:bg-[#900020] hover:text-[#E9DDD4]"
                    >
                        Cancel
                    </Button>
                </div>
            ) : (
                <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-[#900020] text-[#900020] hover:bg-[#900020] hover:text-[#E9DDD4]"
                >
                    Edit
                </Button>
            )}
        </div>
    )
}