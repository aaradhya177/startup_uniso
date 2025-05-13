import { FiCalendar, FiBook, FiMessageCircle } from 'react-icons/fi';
import { useEffect, useState } from 'react';

interface WelcomeHeaderProps {
  userName: string;
}

const timeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const getRandomMotivation = (): string => {
  const motivations = [
    "Today is a great day to learn something new!",
    "Ready to connect with like-minded people?",
    "What will you accomplish today?",
    "Explore new opportunities in your campus journey!",
    "Your academic success starts with each small step."
  ];
  return motivations[Math.floor(Math.random() * motivations.length)];
};

export default function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  const [greeting, setGreeting] = useState<string>(timeBasedGreeting());
  const [motivation, setMotivation] = useState<string>(getRandomMotivation());
  
  useEffect(() => {
    // Update greeting based on time of day
    const intervalId = setInterval(() => {
      setGreeting(timeBasedGreeting());
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <section className="mt-8 mb-14">
      <div className="rounded-2xl overflow-hidden shadow-lg relative">
        {/* Background gradient with animated subtle movement */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-secondary/80 to-accent/70 animate-gradient-slow"></div>
        
        {/* Content container */}
        <div className="relative z-10 p-10 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <span className="text-white/80 font-medium text-lg">{greeting}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 font-display tracking-tight">
              {userName} <span className="inline-block animate-wave">👋</span>
            </h1>
            <p className="text-white/90 text-xl max-w-md">
              {motivation}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <QuickActionButton icon={<FiCalendar className="w-5 h-5" />} label="Events" value="2" />
            <QuickActionButton icon={<FiMessageCircle className="w-5 h-5" />} label="Messages" value="5" />
            <QuickActionButton icon={<FiBook className="w-5 h-5" />} label="Assignments" value="3" />
          </div>
        </div>
      </div>
    </section>
  );
}

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function QuickActionButton({ icon, label, value }: QuickActionButtonProps) {
  return (
    <button className="flex items-center gap-3 bg-white/20 hover:bg-white/30 transition-colors px-4 py-3 rounded-xl backdrop-blur-md text-white">
      {icon}
      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-lg font-bold">{value}</span>
      </div>
    </button>
  );
}
