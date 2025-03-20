"use client";

import { useState } from "react";
import FormSubmit from "../components/form-submit";
import { createPost } from "../lib/serverActions"; // Import server action

export default function NewPostPage() {
   const [errors, setErrors] = useState([]);
   
   async function handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);

      const result = await createPost(formData);

      if (result.errors) {
         setErrors(result.errors);
      } else {
         window.location.href = '/feed';  // Redirect after successful post
      }
   }

   return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
         <h1 className="text-2xl font-bold text-center mb-6">Create New Post</h1>

         {/* Show errors if any */}
         {errors.length > 0 && (
            <div className="bg-red-600 p-2 rounded mb-4">
               {errors.map((error, index) => (
                  <p key={index} className="text-white">{error}</p>
               ))}
            </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div>
               <label htmlFor="title" className="block text-gray-300 font-medium">
                  Title
               </label>
               <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-pink-500"
               />
            </div>

            {/* Image Input */}
            <div>
               <label htmlFor="image" className="block text-gray-300 font-medium">
                  Image URL
               </label>
               <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="image"
                  name="image"
                  className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-pink-500"
               />
            </div>

            {/* Content Input */}
            <div>
               <label htmlFor="content" className="block text-gray-300 font-medium">
                  Content
               </label>
               <textarea
                  id="content"
                  name="content"
                  rows="5"
                  className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-800 text-white focus:ring-2 focus:ring-pink-500"
               />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
               <button
                  type="reset"
                  className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition"
               >
                  Reset
               </button>
               <button
                  type="submit"
                  className="px-4 py-2 rounded bg-pink-500 hover:bg-black text-white font-semibold transition"
               >
                  Create Post
               </button>
               {/* Form Submit Component */}
               <div className="form-actions">
                  <FormSubmit />
               </div>
            </div>
         </form>
      </div>
   );
}
