"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AccountSettings() {
  const [tab, setTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    dob: "",
    phone: "",
    country: "",
  });

  const [preview, setPreview] = useState("");

  // =====================
  // FETCH USER
  // =====================
  useEffect(() => {
    const fetchUser = async () => {
        debugger;
      const res = await axios.get(
        `http://localhost:7000/api/user/profile`,
        { withCredentials: true }
      );

      setForm(res.data);
      setPreview(res.data.image);
      setLoading(false);
    };

    // fetchUser();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const updateProfile = async () => {
    const data = new FormData();

    Object.entries(form).forEach(([k, v]) =>
      data.append(k, v as any)
    );

    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
      data,
      { withCredentials: true }
    );

    alert("Profile Updated ✅");
  };

  const completion =
    Object.values(form).filter(Boolean).length / 6 * 100;

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className=" bg-gray-100 flex justify-center">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl flex">

        {/* SIDEBAR */}
        <div className="w-64 border-r p-6 space-y-4">
          <h2 className="text-xl font-bold mb-6">
            Settings
          </h2>

          {["profile", "security", "notifications"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`block w-full text-left px-4 py-2 rounded-lg ${
                tab === t
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-10">

          {/* PROFILE TAB */}
          {tab === "profile" && (
            <>
              <h1 className="text-2xl font-bold mb-6">
                Profile Settings
              </h1>

              {/* COMPLETION BAR */}
              <div className="mb-8">
                <p className="text-sm mb-2">
                  Profile Completion {Math.round(completion)}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>

              {/* AVATAR */}
              <div className="flex items-center gap-6 mb-8">
                <img
                  src={preview || "/avatar.png"}
                  className="w-24 h-24 rounded-full object-cover"
                />

                <input type="file" onChange={handleImage} />
              </div>

              {/* FORM GRID */}
              <div className="grid grid-cols-2 gap-6">

                <Input label="Name" name="name" value={form.name} onChange={handleChange} />

                <Input label="Email" value={form.email} disabled />

                <Input label="Date of Birth" type="date" name="dob" value={form.dob} onChange={handleChange} />

                <Input label="Country" name="country" value={form.country} onChange={handleChange} />

                <div className="col-span-2">
                  <label className="label">
                    Phone Number
                  </label>
                  <div className="flex gap-3">
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="input flex-1"
                    />
                    <span className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
                      Verified ✓
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={updateProfile}
                className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </>
          )}

          {/* SECURITY TAB */}
          {tab === "security" && (
            <div>
              <h1 className="text-2xl font-bold mb-6">
                Security
              </h1>

              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg">
                Change Password
              </button>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {tab === "notifications" && (
            <div>
              <h1 className="text-2xl font-bold">
                Notifications
              </h1>
              <p className="text-gray-500 mt-2">
                Email preferences coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =====================
// REUSABLE INPUT
// =====================
function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="label">{label}</label>
      <input {...props} className="input" />
    </div>
  );
}