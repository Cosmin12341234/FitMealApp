import { useState } from 'react'
import { format } from 'date-fns'
import {Button} from "@/features/shared/components/ui/button.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/features/shared/components/ui/popover.tsx";
import {Calendar} from "@/features/shared/components/ui/calendar.tsx";

type DaySelectorProps = {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export function DaySelector({ selectedDate, setSelectedDate }: DaySelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + days)
    setSelectedDate(newDate)
  }

  const quickSelect = (days: number) => {
    const newDate = new Date()
    newDate.setDate(newDate.getDate() - days)
    setSelectedDate(newDate)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-center space-x-4">
        <Button
          variant="outline"
          onClick={() => changeDate(-1)}
          className="border-[#900020] text-[#900020] hover:bg-[#900020] hover:text-[#E9DDD4]"
          aria-label="Previous day"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Button>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[240px] border-[#900020] text-[#900020] hover:bg-[#900020] hover:text-[#E9DDD4]"
              aria-label="Select date"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              {format(selectedDate, 'PPP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#E9DDD4]">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date || new Date())
                setIsCalendarOpen(false)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          onClick={() => changeDate(1)}
          className="border-[#900020] text-[#900020] hover:bg-[#900020] hover:text-[#E9DDD4]"
          aria-label="Next day"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Button>
      </div>
      <div className="flex space-x-2">
        <Button onClick={() => quickSelect(0)} className="bg-[#900020] text-[#E9DDD4] hover:bg-[#DC143C]">Today</Button>
        <Button onClick={() => quickSelect(7)} className="bg-[#900020] text-[#E9DDD4] hover:bg-[#DC143C]">1 Week Ago</Button>
        <Button onClick={() => quickSelect(30)} className="bg-[#900020] text-[#E9DDD4] hover:bg-[#DC143C]">1 Month Ago</Button>
      </div>
    </div>
  )
}

