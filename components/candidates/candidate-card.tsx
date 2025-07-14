import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Clock, Star } from "lucide-react"

interface Candidate {
  id: number
  name: string
  title: string
  location: string
  rate: string
  skills: string[]
  experience: string
  availability: string
  avatar: string
}

interface CandidateCardProps {
  candidate: Candidate
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {candidate.avatar}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{candidate.name}</h3>
            <p className="text-gray-600 mb-2">{candidate.title}</p>
            <div className="flex items-center text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-gray-600 text-sm ml-2">(4.9)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 mb-1">{candidate.rate}</div>
            <div className="text-gray-600 text-sm">Per Hour</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {candidate.location}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            {candidate.experience}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <DollarSign className="w-4 h-4 mr-2" />
            {candidate.availability}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline">View Profile</Button>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              Message
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
              Hire Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
