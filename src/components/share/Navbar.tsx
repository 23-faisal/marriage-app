// "use client";
// import { Heart, Menu, X } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen]);

//   const navItems = [
//     { name: "Home", href: "#home" },
//     { name: "Search", href: "#search" },
//     { name: "Success Stories", href: "#stories" },
//     { name: "About", href: "#about" },
//     { name: "Contact", href: "#contact" },
//   ];

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isScrolled
//             ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
//             : "bg-transparent py-4"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             {/* Logo */}
//             <div className="flex items-center space-x-2">
//               {/* This is the modified section: icon removed, image added */}
//               <div className="p-1.5 rounded-full overflow-hidden w-20 h-20 flex items-center justify-center">
//                   <img
//                       src="/logo.png" // **<-- REPLACE WITH YOUR ACTUAL IMAGE PATH**
//                       alt="BiyeBandhan Logo"
//                       className="w-full h-full object-contain" // Ensures the image fits well
//                   />
//               </div>
//               {/* End of modified section */}

//               <span
//                   className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
//                       isScrolled ? "text-gray-800" : "text-white"
//                   }`}
//               >
//                   ShaadiMart BD
//               </span>
//           </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               {navItems.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className={`relative font-medium transition-colors duration-300 hover:text-red-600 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-red-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
//                     isScrolled ? "text-gray-700" : "text-white"
//                   }`}
//                 >
//                   {item.name}
//                 </a>
//               ))}
//               <Link href={"/login"}>
//                 <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
//                   Sign In
//                 </button>
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className={`p-2 transition-colors duration-300 ${
//                   isScrolled ? "text-gray-700" : "text-white"
//                 }`}
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="w-6 h-6" />
//                 ) : (
//                   <Menu className="w-6 h-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Full-Screen Menu */}
//       <div
//         className={`fixed inset-0  md:hidden transition-all z-80 duration-300 ${
//           isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//       >
//         {/* Backdrop */}
//         <div
//           className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />

//         {/* Sidebar */}
//         <div
//           className={`absolute top-0 left-0 h-full w-80 max-w-[80vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
//             isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-100">
//             <div className="flex items-center space-x-3">
//               <div className="bg-gradient-to-r from-red-600 to-pink-600 p-2 rounded-full">
//                 <Heart className="w-5 h-5 text-white" />
//               </div>
//               <span className="text-xl font-bold text-gray-800">
//                 BiyeBandhan
//               </span>
//             </div>
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Navigation Items */}
//           <div className="py-6">
//             {navItems.map((item, index) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className={`block px-6 py-4 text-lg font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 border-l-4 border-transparent hover:border-red-600 animate-slide-in`}
//                 style={{ animationDelay: `${index * 100}ms` }}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {item.name}
//               </a>
//             ))}
//           </div>

//           {/* Sign In Button */}
//           <Link href={"/login"} className="absolute bottom-8 left-6 right-6">
//             <button
//               className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-full hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg font-medium text-lg"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               Sign In
//             </button>
//           </Link>

//           {/* Footer */}
//           <div className="absolute bottom-2 left-6 right-6 text-center">
//             <p className="text-sm text-gray-500">Find your perfect match</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

"use client";
import { Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Events", href: "/events" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50  transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-full overflow-hidden w-20 h-20 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="BiyeBandhan Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <span
                className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                  isScrolled ? "text-red-600" : "text-red-600"
                }`}
              >
                ShaadiMart BD
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative font-medium transition-colors duration-300 hover:text-red-600 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-red-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  {item.name}
                </a>
              ))}

              {/* Desktop Buttons */}
              <div className="flex items-center space-x-4">
                <Link href={"/register"}>
                  <button
                    className={`border-2 px-5 py-2 rounded-full hover:bg-white hover:text-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl ${
                      isScrolled
                        ? "border-red-500 text-black"
                        : "border-white text-white"
                    }`}
                  >
                    Sign Up
                  </button>
                </Link>
                <Link href={"/login"}>
                  <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 transition-colors duration-300 ${
                  isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`fixed inset-0  md:hidden transition-all z-80 duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 h-full w-80 max-w-[80vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 p-2 rounded-full">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                ShaadiMart BD
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="py-6">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-6 py-4 text-lg font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 border-l-4 border-transparent hover:border-red-600 animate-slide-in`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Buttons */}
          <div className="absolute bottom-20 left-6 right-6 space-y-4">
            <Link href={"/register"} className="block">
              <button
                className="w-full border-2 border-red-600 text-red-600 py-4 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg font-medium text-lg "
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </button>
            </Link>
            <Link href={"/login"} className="block">
              <button
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-full hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </button>
            </Link>
          </div>

          {/* Footer */}
          <div className="absolute bottom-2 left-6 right-6 text-center">
            <p className="text-sm text-gray-500">Find your perfect match</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
