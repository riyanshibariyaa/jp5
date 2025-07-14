"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { MoreHorizontal, Mail, Phone, Calendar, Star } from "lucide-react"

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  jobTitle: string
  score: number
  appliedDate: string
  avatar: string
  skills: string[]
}

interface Stage {
  id: string
  name: string
  color: string
  candidates: Candidate[]
}

export default function ATSBoard() {
  const [stages, setStages] = useState<Stage[]>([
    {
      id: "applied",
      name: "Applied",
      color: "bg-gray-100",
      candidates: [
        {
          id: "1",
          name: "John Smith",
          email: "john@example.com",
          phone: "+1 234 567 8900",
          jobTitle: "Senior Frontend Developer",
          score: 85,
          appliedDate: "2024-01-15",
          avatar: "JS",
          skills: ["React", "TypeScript", "Node.js"],
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          phone: "+1 234 567 8901",
          jobTitle: "UX Designer",
          score: 92,
          appliedDate: "2024-01-14",
          avatar: "SJ",
          skills: ["Figma", "Sketch", "Prototyping"],
        },
      ],
    },
    {
      id: "screening",
      name: "Screening",
      color: "bg-blue-100",
      candidates: [
        {
          id: "3",
          name: "Mike Chen",
          email: "mike@example.com",
          phone: "+1 234 567 8902",
          jobTitle: "Product Manager",
          score: 88,
          appliedDate: "2024-01-12",
          avatar: "MC",
          skills: ["Product Strategy", "Analytics", "Agile"],
        },
      ],
    },
    {
      id: "interview",
      name: "Interview",
      color: "bg-yellow-100",
      candidates: [
        {
          id: "4",
          name: "Emily Davis",
          email: "emily@example.com",
          phone: "+1 234 567 8903",
          jobTitle: "Data Scientist",
          score: 94,
          appliedDate: "2024-01-10",
          avatar: "ED",
          skills: ["Python", "Machine Learning", "SQL"],
        },
      ],
    },
    {
      id: "offer",
      name: "Offer",
      color: "bg-green-100",
      candidates: [],
    },
    {
      id: "hired",
      name: "Hired",
      color: "bg-purple-100",
      candidates: [],
    },
  ])

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const sourceStage = stages.find((stage) => stage.id === source.droppableId)
    const destStage = stages.find((stage) => stage.id === destination.droppableId)

    if (!sourceStage || !destStage) return

    const candidate = sourceStage.candidates.find((c) => c.id === draggableId)
    if (!candidate) return

    // Remove from source
    const newSourceCandidates = sourceStage.candidates.filter((c) => c.id !== draggableId)

    // Add to destination
    const newDestCandidates = [...destStage.candidates]
    newDestCandidates.splice(destination.index, 0, candidate)

    // Update stages
    const newStages = stages.map((stage) => {
      if (stage.id === source.droppableId) {
        return { ...stage, candidates: newSourceCandidates }
      }
      if (stage.id === destination.droppableId) {
        return { ...stage, candidates: newDestCandidates }
      }
      return stage
    })

    setStages(newStages)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">ATS Board</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-transparent">
            Configure Stages
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Bulk Actions</Button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {stages.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-80">
              <Card className={`${stage.color} border-2`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{stage.name}</CardTitle>
                    <Badge variant="secondary">{stage.candidates.length}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={stage.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 min-h-[200px] ${
                          snapshot.isDraggingOver ? "bg-blue-50 rounded-lg p-2" : ""
                        }`}
                      >
                        {stage.candidates.map((candidate, index) => (
                          <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`cursor-move hover:shadow-md transition-shadow ${
                                  snapshot.isDragging ? "rotate-2 shadow-lg" : ""
                                }`}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                      <Avatar className="w-10 h-10">
                                        <AvatarFallback className="bg-blue-600 text-white">
                                          {candidate.avatar}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                                        <p className="text-sm text-gray-600">{candidate.jobTitle}</p>
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </div>

                                  <div className="space-y-2 mb-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Mail className="w-4 h-4 mr-2" />
                                      {candidate.email}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Phone className="w-4 h-4 mr-2" />
                                      {candidate.phone}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <Calendar className="w-4 h-4 mr-2" />
                                      Applied {candidate.appliedDate}
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center">
                                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                      <span className="text-sm font-semibold">{candidate.score}/100</span>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap gap-1">
                                    {candidate.skills.slice(0, 3).map((skill) => (
                                      <Badge key={skill} variant="outline" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                    {candidate.skills.length > 3 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{candidate.skills.length - 3}
                                      </Badge>
                                    )}
                                  </div>

                                  <div className="flex space-x-2 mt-3">
                                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                      View
                                    </Button>
                                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                                      Contact
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
