type Time = { hour: number; minute: number }

export const generateTimeSlots = (
  intervalMinutes: number = 30,
  start: Time = { hour: 9, minute: 0 },
  end: Time = { hour: 21, minute: 0 }
): { time: string; description: string }[] => {
  const slots = []

  // convert time to minutes
  const startTime = start.hour * 60 + start.minute
  const endTime = end.hour * 60 + end.minute

  for (let t = startTime; t <= endTime; t += intervalMinutes) {
    // convert back to hours/minutes
    const hour = Math.floor(t / 60)
    const minute = t % 60

    const timeString = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`

    slots.push({
      time: timeString,
      description: "",
    })
  }

  return slots
}