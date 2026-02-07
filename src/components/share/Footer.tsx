import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Success Stories", href: "/notFound" },
        { name: "Careers", href: "/notFound" },
        { name: "Press", href: "/notFound" },
        { name: "Blog", href: "/notFound" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Find Matches", href: "/notFound" },
        { name: "Premium Plans", href: "/notFound" },
        { name: "Matchmaking", href: "/notFound" },
        { name: "Events", href: "/notFound" },
        { name: "Consultation", href: "/notFound" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/notFound" },
        { name: "Contact Us", href: "/contact" },
        { name: "Safety Tips", href: "/notFound" },
        { name: "Community Guidelines", href: "/notFound" },
        { name: "Report Issue", href: "/notFound" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy & Policy", href: "/privacy-policy" },
        { name: "Terms & Service", href: "terms" },
        { name: "Cookie Policy", href: "/notFound" },
        { name: "Refund Policy", href: "notFound" },
        { name: "Disclaimer", href: "notFound" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-1.5 rounded-full overflow-hidden w-20 h-20 flex items-center justify-center">
                  <img
                      src="/logo.png" // **<-- REPLACE WITH YOUR ACTUAL IMAGE PATH**
                      alt="BiyeBandhan Logo"
                      className="w-full h-full object-contain" // Ensures the image fits well
                  />
              </div>
              <span className="text-2xl font-bold text-red-600"> ShaadiMart BD</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              The most trusted matrimony service for NRIs in Bangladesh. We help
              thousands of people find their perfect life partner through our
              secure and verified platform.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-500" />
                <span className="text-gray-400">shaadimart1@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-500" />
                <span className="text-gray-400">+8801741664082
</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="text-gray-400">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-6 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 font-medium">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <span className="text-gray-400 font-medium">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-l-full focus:outline-none focus:border-red-500 text-white"
                />
                <button className="bg-gradient-to-r from-red-600 to-pink-600 px-6 py-2 rounded-r-full hover:from-red-700 hover:to-pink-700 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              ©2025 Shaadimart BD All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy & Policy
              </a>
              <a
                href="/terms-condition"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms & Condition
              </a>
              <a
                href="/notFound"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
