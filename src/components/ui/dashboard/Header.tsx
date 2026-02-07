"use client";

import { logout } from "@/service/authService";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Menu, Settings, User } from "lucide-react"; // Added Menu icon
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface UserType {
  name?: string;
  email?: string;
  profileImage?: string;
}

interface HeaderProps {
  user?: UserType | null;
  onLogout?: () => void; // Optional logout handler
  onMenuClick?: () => void; // New prop for sidebar toggle
}

const Header: React.FC<HeaderProps> = ({ user, onMenuClick }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLink = [
    // { name: "Success Stories", path: "/success-stories" },
    { name: "Packages", path: "/user/packages" },
    { name: "Help", path: "/help" },
  ];

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  const fallbackAvatar = "/fallback-avatar.png"; // Place in /public

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try{
      await logout();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      toast.success("Successfully logged out!");
      router.push("/");
    }catch(error){
      toast.error("Logout failed!");
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left Section: Menu Button (Mobile) + Logo */}
          <div className="flex items-center space-x-4">
            {/* Menu Button for Mobile */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-white" />
            </button>

            {/* Logo */}
            <Link href="/user/dashboard" className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-full overflow-hidden w-20 h-20 flex items-center justify-center">
                    <img
                        src="/logo.png" 
                        alt="ShaadiMart BD Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
                <span className={"text-xl sm:text-2xl text-red-600 font-bold transition-colors duration-300"}>
                    ShaadiMart BD
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLink.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-gray-200 font-bold hover:text-rose-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Profile Section */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              {user?.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt={user.name || "User Avatar"}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border border-gray-700 shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-semibold shadow-sm">
                  {userInitial}
                </div>
              )}
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 z-50"
                >
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    Profile
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2 text-gray-500" />
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition"
                  >
                    <LogOut className="h-4 w-4 mr-2 text-rose-500" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;