"use client";
import { MoreVertical } from "lucide-react";

const shortlistedUsers = [
  {
    id: 1,
    name: "Ayesha Rahman",
    info: "25 • Dhaka, Bangladesh",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "Nusrat Hossain",
    info: "27 • Chattogram, Bangladesh",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    id: 3,
    name: "Farhana Karim",
    info: "23 • Sylhet, Bangladesh",
    image: "",
  },
];

export default function MyShortlistedCard() {
  return (
    <section>
      <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
        My Shortlist
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="space-y-4">
          {shortlistedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={
                      user.image ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.info}</p>
                </div>
              </div>
              <MoreVertical className="text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-600" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
