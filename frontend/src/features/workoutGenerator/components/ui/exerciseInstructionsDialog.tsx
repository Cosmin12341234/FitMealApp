import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/features/shared/components/ui/dialog"
import { ExerciseResponse } from '@/utils/types'

interface ExerciseInstructionsDialogProps {
    exercise: ExerciseResponse | null
    onClose: () => void
}

export function ExerciseInstructionsDialog({ exercise, onClose }: ExerciseInstructionsDialogProps) {
    return (
        <Dialog open={!!exercise} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{exercise?.name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Instructions:</h4>
                    <p className="text-sm whitespace-pre-wrap">
                        {exercise?.instructions}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}