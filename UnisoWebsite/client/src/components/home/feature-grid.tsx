import { useQuery } from "@tanstack/react-query";
import { Event, Question } from "@shared/schema";
import FeatureCard from "./feature-card";
import { 
  Users, 
  Briefcase, 
  CalendarDays, 
  FileText, 
  MessageCircle, 
  HelpCircle 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export default function FeatureGrid() {
  const { data: events } = useQuery<Event[]>({
    queryKey: ["/api/events/upcoming"],
  });

  const { data: questions } = useQuery<Question[]>({
    queryKey: ["/api/questions/recent/2"],
  });

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {/* Join Groups Card */}
      <FeatureCard
        title="Join Groups"
        description="Find clubs and communities"
        icon={<Users className="h-6 w-6 text-secondary-500" />}
        color="purple"
        buttonText="Explore Groups"
        buttonAction={() => console.log("Explore Groups clicked")}
      />

      {/* Find Internships Card */}
      <FeatureCard
        title="Find Intern­ships"
        description="Recommendations just for you"
        icon={<Briefcase className="h-6 w-6 text-accent-500" />}
        color="orange"
        buttonText="Discover Opportunities"
        buttonAction={() => console.log("Discover Opportunities clicked")}
      />

      {/* Upcoming Events Card */}
      <FeatureCard
        title="Upcoming Events"
        description="Don't miss out on what's happening"
        icon={<CalendarDays className="h-6 w-6 text-primary-500" />}
        color="blue"
      >
        <div className="mt-4 space-y-3">
          {events?.slice(0, 2).map((event) => (
            <div key={event.id} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center">
                <div className="bg-primary-100 rounded-lg p-2 mr-3 text-center">
                  <span className="text-primary-600 font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short',
                      day: 'numeric'
                    }).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.location} • {event.time}</p>
                </div>
              </div>
            </div>
          ))}
          {!events?.length && (
            <div className="bg-white rounded-lg p-3 shadow-sm text-gray-500 text-center">
              No upcoming events
            </div>
          )}
        </div>
      </FeatureCard>

      {/* Share Notes Card */}
      <FeatureCard
        title="Share Notes"
        description="Get tips and knowledge from peers"
        icon={<FileText className="h-6 w-6 text-primary-500" />}
        color="blue"
        buttonText="Browse Notes"
        buttonAction={() => console.log("Browse Notes clicked")}
      />

      {/* Chat Card */}
      <FeatureCard
        title="Chat with"
        description="Stay connected and keep in touch"
        icon={<MessageCircle className="h-6 w-6 text-secondary-500" />}
        color="purple"
      >
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">ONLINE FRIENDS</h3>
          <div className="flex space-x-2">
            {/* Sample online users - in a real app, these would come from an API */}
            <div className="relative">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=John" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="relative">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="relative">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Michael" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-600 font-medium">
              +5
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button 
            className="bg-secondary-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full"
            onClick={() => console.log("Open Messages clicked")}
          >
            Open Messages
          </button>
        </div>
      </FeatureCard>

      {/* Questions Card */}
      <FeatureCard
        title="Ask Questions"
        description="Get answers and assistance"
        icon={<HelpCircle className="h-6 w-6 text-accent-500" />}
        color="orange"
      >
        <div className="mt-4 space-y-3">
          {questions?.map((question) => (
            <div key={question.id} className="bg-white rounded-lg p-3 shadow-sm">
              <h3 className="font-medium">{question.title}</h3>
              <p className="text-sm text-gray-500">
                {question.answerCount} {question.answerCount === 1 ? 'answer' : 'answers'} • {formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}
              </p>
            </div>
          ))}
          {!questions?.length && (
            <div className="bg-white rounded-lg p-3 shadow-sm text-gray-500 text-center">
              No recent questions
            </div>
          )}
        </div>
        <div className="mt-4">
          <button 
            className="bg-accent-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full"
            onClick={() => console.log("Ask a Question clicked")}
          >
            Ask a Question
          </button>
        </div>
      </FeatureCard>
    </section>
  );
}
