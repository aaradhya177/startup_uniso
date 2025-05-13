import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User as UserIcon } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { data: currentUser } = useQuery<User>({
    queryKey: ["/api/current-user"],
  });

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Friends", href: "/friends" },
    { name: "Groups", href: "/groups" },
    { name: "Resources", href: "/resources" },
    { name: "Profile", href: "/profile" },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="gradient-header fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-heavy text-white tracking-tight flex items-center">
              <span className="inline-block mr-1.5 text-accent font-bold">UNI</span>SO
              <span className="ml-1 text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full font-medium tracking-normal">BETA</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`font-medium nav-link cursor-pointer ${
                  isActive(item.href) 
                    ? "text-white font-semibold" 
                    : "text-white/80 hover:text-white"
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-1 hover:bg-white/10">
                  {currentUser?.avatar ? (
                    <Avatar className="h-8 w-8 border-2 border-white/30">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.fullName} />
                      <AvatarFallback className="bg-primary text-white">{currentUser.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <UserIcon className="h-6 w-6 text-white" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden ml-1 text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="px-2 py-6">
                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <span 
                          className={`py-2 px-3 rounded-md block cursor-pointer ${
                            isActive(item.href) 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
