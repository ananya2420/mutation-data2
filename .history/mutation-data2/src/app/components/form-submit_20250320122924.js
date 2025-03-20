"use client";
import { useFormStatus } from "react-dom";

export default function FormSubmit() {
   const status = useFormStatus();

   if(status.pending){
    return <p>Creating post...</p>;
   }

   return (
      <div className="flex justify-between space-x-4">
         <button
            type="reset"
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition"
         >
            Reset
         </button>
         <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold transition"
         >
            Create Post
         </button>
      </div>
   );
}
