import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign, Building2, Bookmark } from "lucide-react"

interface Job {
  id: number
  title: string
  company: string
  location: string
  type: string
  salary: string
  posted: string
  description: string
  requirements: string[]
  logo: string
}

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              {job.logo}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <Building2 className="w-4 h-4 mr-1" />
                {job.company}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            Published {job.posted}
          </div>
          <div className="flex items-center text-green-600 font-semibold text-sm">
            <DollarSign className="w-4 h-4 mr-1" />
            {job.salary}
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {job.type}
          </Badge>
          {job.requirements.slice(0, 2).map((req, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {req}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline">View Details</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Apply Now</Button>
        </div>
      </CardContent>
    </Card>
  )
}
