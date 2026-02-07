"use client";
import React from "react";

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accentColorClass: string;
}

// Define an interface for the props we expect on a direct child <div>
interface ChildDivProps {
  children: React.ReactNode;
  className?: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ icon, title, children, accentColorClass }) => {
  // Logic to determine background color from accent color class
  const bgColorClass = accentColorClass.replace("text-", "bg-").replace("-600", "-100");

  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:translate-y-[-1px] overflow-hidden">
      {/* Subtle Colored Background for the card */}
      <div className={`absolute inset-0 ${bgColorClass} opacity-40 rounded-2xl`}></div>
      
      <div className="relative flex items-center space-x-4 mb-4 border-b border-gray-200 pb-4">
        {/* Highlighted Icon */}
        <div className={`p-3 rounded-xl ${accentColorClass.replace("text-", "bg-")} bg-opacity-25`}>
          {icon}
        </div>
        <h3 className="text-xl font-extrabold text-gray-900">{title}</h3>
      </div>
      
      {/* Dynamic Content Styling */}
      <div className="relative text-gray-800 space-y-3 text-base">
        {React.Children.map(children, child => {
            if (React.isValidElement(child) && (child.type as any) === 'div') {
                // Safely cast child.props to the interface we defined
                const childProps = child.props as ChildDivProps;

                // Attempt to convert children to a string to check for the ':' separator
                // This logic is designed to parse the format "Key: Value"
                const childText = React.Children.toArray(childProps.children).join('').trim();
                const parts = childText.split(':');

                
                // Special handling for header divs like "Parents" or "Siblings"
                if (childProps.className?.includes('font-extrabold')) {
                    // Fix: Explicitly define the props passed to cloneElement as HTMLAttributes or similar
                    return React.cloneElement(child, {
                        className: `text-lg font-extrabold text-gray-900 mt-4 border-b border-gray-100 pb-1`,
                    } as React.HTMLAttributes<HTMLDivElement>);
                }
                
                // If it looks like a Key: Value pair (i.e., it has a colon and content)
                if (parts.length > 1) {
                    const key = parts[0];
                    const value = parts.slice(1).join(':').trim();
                    
                    return (
                        <div className="flex justify-between items-start border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                            <span className="text-gray-600 font-medium">{key}:</span>
                            <span className="font-bold text-gray-800 text-right ml-4">{value}</span>
                        </div>
                    );
                }

                // Fallback for any other <div> that doesn't fit the Key: Value structure
                return child; 
            }
            return child; // Return non-<div> elements as is
        })}
      </div>
    </div>
  );
};

export default DetailCard;
