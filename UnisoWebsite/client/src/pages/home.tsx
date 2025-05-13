import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import WelcomeHeader from "@/components/home/welcome-header";
import FeatureGrid from "@/components/home/feature-grid";
import ExploreInterests from "@/components/home/explore-interests";
import CampusHighlights from "@/components/home/campus-highlights";
import GetStartedBanner from "@/components/home/get-started-banner";

export default function Home() {
  const { data: currentUser, isLoading } = useQuery<User>({
    queryKey: ["/api/current-user"],
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8 mt-8">
        <div className="h-16 bg-gray-200 rounded-lg w-3/4 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white h-64 rounded-xl shadow-md"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <WelcomeHeader userName={currentUser?.fullName || "Student"} />
      <FeatureGrid />
      <ExploreInterests />
      <CampusHighlights />
      <GetStartedBanner />
    </>
  );
}
