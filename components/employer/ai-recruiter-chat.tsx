"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Lightbulb, Users, FileText, Calendar } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function AIRecruiterChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI recruiting assistant. I can help you with candidate evaluation, interview questions, job posting optimization, and hiring process guidance. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const quickActions = [
    {
      icon: Users,
      title: "Evaluate Candidates",
      description: "Get insights on candidate profiles and scores",
      prompt: "Help me evaluate the top candidates for my Senior Frontend Developer position",
    },
    {
      icon: FileText,
      title: "Interview Questions",
      description: "Generate relevant interview questions",
      prompt: "Generate technical interview questions for a React developer position",
    },
    {
      icon: Lightbulb,
      title: "Job Optimization",
      description: "Improve your job postings",
      prompt: "How can I optimize my job posting to attract better candidates?",
    },
    {
      icon: Calendar,
      title: "Hiring Process",
      description: "Get guidance on hiring workflows",
      prompt: "What's the best hiring process for a startup looking to scale quickly?",
    },
  ]

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          context: "employer_dashboard",
        }),
      })

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm currently unavailable. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Quick Actions */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full h-auto p-3 flex flex-col items-start text-left bg-transparent"
                  onClick={() => handleQuickAction(action.prompt)}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-sm">{action.title}</span>
                  </div>
                  <span className="text-xs text-gray-600">{action.description}</span>
                </Button>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-3">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <span>AI Recruiting Assistant</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback
                        className={message.sender === "ai" ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}
                      >
                        {message.sender === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-600 text-white">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about recruiting..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage(inputMessage)}
                disabled={isLoading}
              />
              <Button
                onClick={() => sendMessage(inputMessage)}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
