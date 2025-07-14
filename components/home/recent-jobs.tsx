import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Building2 } from "lucide-react"

export default function RecentJobs() {
  const jobs = [
    {
      id: 1,
      title: "Digital Marketing Executive",
      company: "TechCorp Solutions",
      location: "Sacramento, California",
      type: "Full Time",
      salary: "$1200-$2500",
      posted: "11 months ago",
      logo: "G",
    },
    {
      id: 2,
      title: "Senior Software Developer",
      company: "Innovation Labs",
      location: "New York, NY",
      type: "Full Time",
      salary: "$3000-$5000",
      posted: "2 days ago",
      logo: "I",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Agency",
      location: "Los Angeles, CA",
      type: "Part Time",
      salary: "$2000-$3500",
      posted: "1 week ago",
      logo: "C",
    },
    {
      id: 4,
      title: "Data Analyst",
      company: "DataTech Inc",
      location: "Chicago, IL",
      type: "Full Time",
      salary: "$2500-$4000",
      posted: "3 days ago",
      logo: "D",
    },
    {
      id: 5,
      title: "Project Manager",
      company: "Global Solutions",
      location: "Miami, FL",
      type: "Full Time",
      salary: "$3500-$5500",
      posted: "5 days ago",
      logo: "G",
    },
    {
      id: 6,
      title: "Content Writer",
      company: "Media House",
      location: "Austin, TX",
      type: "Remote",
      salary: "$1500-$2800",
      posted: "1 day ago",
      logo: "M",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recent Jobs</h2>
          <p className="text-lg text-gray-600">20+ Recently Added Jobs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {job.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Building2 className="w-4 h-4 mr-1" />
                      {job.company}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    Published {job.posted}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {job.type}
                  </Badge>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg">Browse All Jobs →</button>
        </div>
      </div>
    </section>
  )
}
