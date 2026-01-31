"use client";

import { assets } from "@/assets/assets/assets_frontend/assets";
import ImageUpload from "@/components/ImageUpload";
import { useAuth } from "@/hooks/useUser";
import { UserProfile } from "@/services/user";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const page = () => {
  const { user, isLoading,updateProfile } = useAuth();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const initialState = {
    name: "",
    image: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    dob: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  useEffect(() => {
    if (!isLoading && user) {
      setUserData(user);
    }
  }, [user]);

  const UploadImageToCloudinary = async () => {
    if (!imageFile) {
      console.log("No image selected");
      return;
    }
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/uploadImage`,
        data,
      );
      if (response.data?.success) {
        setUploadedImageUrl(response.data?.result?.url);
        setFormData((prev) => ({ ...prev, image: response.data?.result?.url }));
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) {
      UploadImageToCloudinary();
    }
  }, [imageFile]);

  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = async () => {
     updateProfile.mutate(formData)
  };
  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm py-20">
      {isEdit ? (
        <ImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          isLoading={imageLoadingState}
        />
      ) : (
        <Image
          className="w-36 rounded"
          width={36}
          height={36}
          src={userData.image}
          alt={"user_image"}
        />
      )}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl border border-blue-300 font-medium max-w-60 mt-4"
          type="text"
          value={formData.name}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}
      <hr className="bg-zinc-400 h-px border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700">
          <p className="font-medium">Email Address:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone Number:</p>
          {isEdit ? (
            <input
              className="bg-gray-50 max-w-52 border border-blue-300 "
              type="text"
              value={formData.phone}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, phone: e.target.value }));
              }}
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input
                type="text"
                className="bg-gray-50 border border-blue-300"
                value={formData.address.line1}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line1: e.target.value,
                    },
                  }))
                }
              />{" "}
              <br />
              <input
                type="text"
                className="bg-gray-50 border border-blue-300"
                value={formData.address.line2}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: {
                      ...prev.address,
                      line2: e.target.value,
                    },
                  }))
                }
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              value={formData.gender}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, gender: e.target.value }));
              }}
            >
              <option value="" disabled>
    Select gender
  </option>
  <option value="male">Male</option>
  <option value="female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100"
              type="date"
              value={formData.dob}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, dob: e.target.value }));
              }}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500"
              onClick={handleEdit}
            >
              Save information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-all duration-500"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
};

export default page;
