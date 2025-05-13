import { CalendarDays, ArrowRight } from "lucide-react";

// In a real app, these would come from an API
const highlights = [
  {
    id: 1,
    title: "Library Week Events",
    description: "Special workshops, extended hours, and resource fairs all week.",
    date: "Apr 10-16, 2023",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
  },
  {
    id: 2,
    title: "Finals Study Groups",
    description: "Join subject-specific study groups led by senior students.",
    date: "Starting Apr 20, 2023",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
  },
  {
    id: 3,
    title: "Spring Career Fair",
    description: "Over 50 companies recruiting for internships and full-time positions.",
    date: "Apr 15, 2023 • 10AM-4PM",
    image: "https://images.unsplash.com/photo-1573164574001-518958d9baa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
  }
];

export default function CampusHighlights() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-heavy mb-8 text-center gradient-primary bg-clip-text text-transparent inline-block">Campus Highlights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((highlight) => (
          <div 
            key={highlight.id} 
            className="bg-white rounded-trendy overflow-hidden shadow-crisp feature-card group"
          >
            <div className="relative overflow-hidden">
              <img 
                src={highlight.image} 
                alt={highlight.title} 
                className="w-full h-52 object-cover transform transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold flex items-center">
                <CalendarDays className="h-3 w-3 mr-1 text-primary-600" />
                <span className="text-gray-800">{highlight.date}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-heavy text-xl mb-3 text-gray-800">{highlight.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{highlight.description}</p>
              <button className="text-primary-600 font-bold text-sm hover:text-primary-800 flex items-center transition-colors">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
