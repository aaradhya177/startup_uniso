import { Link } from "wouter";
import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Apple, 
  PlaySquare 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-heavy mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">UNISO</h2>
            <p className="text-gray-400 text-sm">
              Connecting students with opportunities, resources, and each other.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase text-primary-400 mb-4">RESOURCES</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help">
                  <a className="text-gray-300 hover:text-primary-400 text-sm transition-colors">Help Center</a>
                </Link>
              </li>
              <li>
                <Link href="/guidelines">
                  <a className="text-gray-300 hover:text-primary-400 text-sm transition-colors">Community Guidelines</a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a className="text-gray-300 hover:text-primary-400 text-sm transition-colors">Student Resources</a>
                </Link>
              </li>
              <li>
                <Link href="/career">
                  <a className="text-gray-300 hover:text-primary-400 text-sm transition-colors">Career Services</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase text-secondary-400 mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-secondary-400 text-sm transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-gray-300 hover:text-secondary-400 text-sm transition-colors">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-gray-300 hover:text-secondary-400 text-sm transition-colors">Terms of Service</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-secondary-400 text-sm transition-colors">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase text-accent-400 mb-4">CONNECT</h3>
            <div className="flex space-x-4 mb-5">
              <a href="#" className="text-gray-400 hover:text-white bg-gray-800 hover:bg-primary-600 p-2 rounded-full transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white bg-gray-800 hover:bg-primary-600 p-2 rounded-full transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white bg-gray-800 hover:bg-primary-600 p-2 rounded-full transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white bg-gray-800 hover:bg-primary-600 p-2 rounded-full transition-all duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-gray-300 font-bold mb-3">Download our mobile app</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-center transition-colors">
                <Apple className="mr-2 h-5 w-5" />
                <span>App Store</span>
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-center transition-colors">
                <PlaySquare className="mr-2 h-5 w-5" />
                <span>Play Store</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} <span className="text-primary-400 font-bold">UNISO</span>. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex items-center">
            <select className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
            <span className="ml-4 text-xs text-gray-500">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
