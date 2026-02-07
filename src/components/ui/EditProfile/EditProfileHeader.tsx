"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EditProfileHeaderProps {
  profile: any;
}

export default function EditProfileHeader({ profile }: EditProfileHeaderProps) {
  const [form, setForm] = useState({
    name: profile.name || "",
    email: profile.email || "",
    phone_number: profile.phone_number || "",
  });

  const [profilePictures, setProfilePictures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch profile pictures
  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const res = await fetch(`/api/user/profile-pictures`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.data) setProfilePictures(data.data);
      } catch {
        toast.error("Failed to load profile pictures");
      } finally {
        setLoading(false);
      }
    };
    fetchPictures();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`/api/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) toast.success("Profile updated successfully");
      else toast.error(data.message || "Update failed");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handlePrimaryChange = async (pictureId: number) => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`/api/user/profile-pictures/${pictureId}/primary`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Primary picture updated");
        setProfilePictures((prev) =>
          prev.map((pic) => ({ ...pic, is_primary: pic.id === pictureId }))
        );
      } else toast.error(data.message || "Failed to set primary");
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p>Loading profile pictures...</p>;

  return (
    <div className="bg-white shadow p-5 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <div className="flex items-center space-x-5 mb-5">
        {profilePictures.map((pic) => (
          <div key={pic.id} className="relative">
            <img
              src={pic.url}
              alt="Profile"
              className={`w-20 h-20 rounded-full border ${
                pic.is_primary ? "border-rose-500" : "border-gray-300"
              }`}
            />
            {!pic.is_primary && (
              <Button
                size="sm"
                className="absolute bottom-0 right-0 text-xs p-1"
                onClick={() => handlePrimaryChange(pic.id)}
              >
                Set Primary
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <Input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={handleChange}
        />
      </div>

      <Button className="mt-4 bg-rose-500 hover:bg-rose-600" onClick={handleSave}>
        Save Profile
      </Button>
    </div>
  );
}
