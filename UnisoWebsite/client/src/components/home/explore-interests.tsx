import { useQuery } from "@tanstack/react-query";
import { InterestCategory } from "@shared/schema";
import { Link } from "wouter";
import { Code, Brain, Laptop, Users, Book, ArrowRight } from "lucide-react";

export default function ExploreInterests() {
  const { data: categories } = useQuery<InterestCategory[]>({
    queryKey: ["/api/interest-categories"],
  });

  // Map category icons by name
  const getCategoryIcon = (iconName: string, className = "text-gray-700 text-xl") => {
    switch (iconName) {
      case "code":
        return <Code className={className} />;
      case "brain":
        return <Brain className={className} />;
      case "laptop-code":
        return <Laptop className={className} />;
      default:
        return <Code className={className} />;
    }
  };

  return (
    <section className="mb-14">
      <h2 className="text-3xl font-heavy mb-8 text-center gradient-primary bg-clip-text text-transparent inline-block">Explore Interests</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <div key={category.id} className="feature-card bg-white rounded-trendy p-6 shadow-crisp border border-gray-100">
            <div className="flex items-center mb-5">
              <div className="p-3 bg-primary-100 rounded-trendy mr-4 text-primary-600">
                {getCategoryIcon(category.icon, "text-primary-600 text-2xl")}
              </div>
              <h3 className="text-xl font-heavy">{category.name}</h3>
            </div>
            
            {/* Category stats */}
            <div className="space-y-3 mt-5 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-700">
                <Users className="h-5 w-5 mr-2 text-secondary-500" />
                <span><span className="font-bold">{category.groupCount}</span> active groups</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Book className="h-5 w-5 mr-2 text-accent-500" />
                <span><span className="font-bold">{category.resourceCount}</span> resources</span>
              </div>
            </div>
            
            <div className="mt-5">
              <Link href={`/interests/${category.id}`}>
                <a className="text-primary-600 hover:text-primary-700 font-bold flex items-center hover:underline transition-all duration-200">
                  Explore <ArrowRight className="ml-1 h-4 w-4 animate-pulse" />
                </a>
              </Link>
            </div>
          </div>
        ))}

        {!categories?.length && (
          <div className="col-span-full">
            <div className="bg-white rounded-trendy p-8 shadow-crisp text-center text-gray-500">
              No interest categories available
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <button className="gradient-primary text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
          View All Interest Categories
        </button>
      </div>
    </section>
  );
}
