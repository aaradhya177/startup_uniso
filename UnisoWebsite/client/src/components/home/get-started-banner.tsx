import { Button } from "@/components/ui/button";

export default function GetStartedBanner() {
  return (
    <section className="rounded-trendy p-0 text-white shadow-crisp overflow-hidden relative mb-4">
      <div className="absolute inset-0 bg-gradient-to-r from-[#f43f5e] via-[#8b5cf6] to-[#10b981] opacity-95"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920')] bg-cover opacity-10"></div>
      <div className="relative z-10 p-10">
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-heavy mb-3">Complete Your Profile</h2>
            <p className="text-white/90 text-lg max-w-xl">
              Add your interests, skills, and courses to get personalized recommendations and connect with like-minded peers.
            </p>
          </div>
          <div>
            <Button 
              className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg"
              onClick={() => console.log("Update Profile clicked")}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
