import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user, setUser, updateUserProfile } = useAuth(); // context থেকে setUser নিশ্চিতভাবে নাও
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let photoURL = user?.photoURL;

      if (data.image && data.image.length > 0) {
        photoURL = await imageUpload(data.image[0]);
      }

      // Firebase update
      await updateUserProfile(data.name, photoURL);
      console.log("Firebase profile updated ✅");

      // React context update করে UI instant update কর
      if (setUser) {
        setUser(prev => ({
          ...prev,
          displayName: data.name,
          photoURL: photoURL
        }));
      }

      // Form reset
      reset({ name: data.name, email: user.email });

      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Profile update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>
      <div className="bg-white shadow rounded-xl p-6 grid md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/2kR1Jxq/user.png"}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Profile Image</label>
            <input
              type="file"
              {...register("image")}
              className="file-input w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
