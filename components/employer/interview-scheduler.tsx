"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { CalendarIcon, Clock, Plus, Edit, Trash2, Video, LinkIcon } from "lucide-react"
import { format, parseISO } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Interview {
  _id: string
  candidateName: string
  jobTitle: string
  interviewerName: string
  date: string // ISO string
  time: string // HH:MM
  type: "online" | "in-person"
  location?: string
  meetingLink?: string
  notes?: string
  status: "scheduled" | "completed" | "cancelled"
}

export default function InterviewScheduler() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentInterview, setCurrentInterview] = useState<Partial<Interview> | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Mock data for demonstration
  const mockInterviews: Interview[] = [
    {
      _id: "i1",
      candidateName: "Alice Johnson",
      jobTitle: "Senior Frontend Developer",
      interviewerName: "Sarah Wilson",
      date: "2024-02-20T00:00:00.000Z",
      time: "10:00",
      type: "online",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      status: "scheduled",
    },
    {
      _id: "i2",
      candidateName: "Bob Williams",
      jobTitle: "UX/UI Designer",
      interviewerName: "Mike Chen",
      date: "2024-02-22T00:00:00.000Z",
      time: "14:30",
      type: "in-person",
      location: "Office A, Room 301",
      status: "scheduled",
    },
    {
      _id: "i3",
      candidateName: "Charlie Brown",
      jobTitle: "Backend Engineer",
      interviewerName: "Sarah Wilson",
      date: "2024-02-10T00:00:00.000Z",
      time: "11:00",
      type: "online",
      meetingLink: "https://zoom.us/j/1234567890",
      status: "completed",
      notes: "Good technical skills, strong problem-solving. Lacks some leadership experience.",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInterviews(mockInterviews)
      setLoading(false)
    }, 1000)
  }, [])

  const handleOpenDialog = (interview?: Interview) => {
    setCurrentInterview(interview || {})
    setDate(interview ? parseISO(interview.date) : undefined)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setCurrentInterview(null)
    setDate(undefined)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCurrentInterview((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveInterview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentInterview || !date) return

    const interviewToSave = {
      ...currentInterview,
      date: date.toISOString(), // Convert Date object to ISO string
    } as Interview

    try {
      if (interviewToSave._id) {
        // Update existing interview
        setInterviews(interviews.map((i) => (i._id === interviewToSave._id ? interviewToSave : i)))
        alert("Interview updated successfully!")
      } else {
        // Create new interview
        const newInterview = { ...interviewToSave, _id: `i${Date.now()}` }
        setInterviews([...interviews, newInterview])
        alert("Interview scheduled successfully!")
      }
      handleCloseDialog()
    } catch (error) {
      console.error("Save interview error:", error)
      alert("Failed to save interview")
    }
  }

  const handleDeleteInterview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this interview?")) {
      return
    }
    try {
      setInterviews(interviews.filter((i) => i._id !== id))
      alert("Interview deleted successfully!")
    } catch (error) {
      console.error("Delete interview error:", error)
      alert("Failed to delete interview")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Loading interviews...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Interview Scheduler</h2>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule New Interview
        </Button>
      </div>

      {/* Upcoming Interviews */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviews.filter((i) => i.status === "scheduled").length === 0 && (
              <p className="text-gray-600">No upcoming interviews.</p>
            )}
            {interviews
              .filter((i) => i.status === "scheduled")
              .map((interview) => (
                <div key={interview._id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {interview.candidateName} - {interview.jobTitle}
                      </h3>
                      <p className="text-sm text-gray-600">Interviewer: {interview.interviewerName}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{format(parseISO(interview.date), "PPP")}</span>
                        <Clock className="w-4 h-4" />
                        <span>{interview.time}</span>
                      </div>
                      {interview.type === "online" && interview.meetingLink && (
                        <div className="flex items-center space-x-2 text-sm text-blue-600 mt-1">
                          <Video className="w-4 h-4" />
                          <a
                            href={interview.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            Join Meeting
                          </a>
                        </div>
                      )}
                      {interview.type === "in-person" && interview.location && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                          <LinkIcon className="w-4 h-4" />
                          <span>{interview.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleOpenDialog(interview)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteInterview(interview._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Interviews */}
      <Card>
        <CardHeader>
          <CardTitle>Past Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviews.filter((i) => i.status !== "scheduled").length === 0 && (
              <p className="text-gray-600">No past interviews.</p>
            )}
            {interviews
              .filter((i) => i.status !== "scheduled")
              .map((interview) => (
                <div key={interview._id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {interview.candidateName} - {interview.jobTitle}
                      </h3>
                      <p className="text-sm text-gray-600">Interviewer: {interview.interviewerName}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{format(parseISO(interview.date), "PPP")}</span>
                        <Clock className="w-4 h-4" />
                        <span>{interview.time}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(interview.status)}>
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </Badge>
                  </div>
                  {interview.notes && (
                    <div className="mt-2 text-sm text-gray-700">
                      <p className="font-medium">Notes:</p>
                      <p>{interview.notes}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview Schedule Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentInterview?._id ? "Edit Interview" : "Schedule New Interview"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveInterview} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="candidateName" className="text-right">
                Candidate Name
              </label>
              <Input
                id="candidateName"
                name="candidateName"
                value={currentInterview?.candidateName || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="jobTitle" className="text-right">
                Job Title
              </label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={currentInterview?.jobTitle || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="interviewerName" className="text-right">
                Interviewer
              </label>
              <Input
                id="interviewerName"
                name="interviewerName"
                value={currentInterview?.interviewerName || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right">
                Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("col-span-3 justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="time" className="text-right">
                Time
              </label>
              <Input
                id="time"
                name="time"
                type="time"
                value={currentInterview?.time || ""}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={currentInterview?.type || ""}
                onChange={handleChange}
                className="col-span-3 h-10 px-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Type</option>
                <option value="online">Online</option>
                <option value="in-person">In-person</option>
              </select>
            </div>
            {currentInterview?.type === "online" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="meetingLink" className="text-right">
                  Meeting Link
                </label>
                <Input
                  id="meetingLink"
                  name="meetingLink"
                  value={currentInterview?.meetingLink || ""}
                  onChange={handleChange}
                  className="col-span-3"
                  type="url"
                  placeholder="e.g., Google Meet, Zoom link"
                />
              </div>
            )}
            {currentInterview?.type === "in-person" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right">
                  Location
                </label>
                <Input
                  id="location"
                  name="location"
                  value={currentInterview?.location || ""}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="e.g., Office A, Room 301"
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={currentInterview?.status || "scheduled"}
                onChange={handleChange}
                className="col-span-3 h-10 px-3 border border-gray-300 rounded-md"
                required
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="notes" className="text-right">
                Notes
              </label>
              <Textarea
                id="notes"
                name="notes"
                value={currentInterview?.notes || ""}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Add any interview notes here..."
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {currentInterview?._id ? "Save Changes" : "Schedule Interview"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
