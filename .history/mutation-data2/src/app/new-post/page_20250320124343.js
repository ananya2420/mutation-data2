import { redirect } from "next/navigation";
import { storePost } from "../lib/posts";
import FormSubmit from "../components/form-submit";




export default function NewPostPage() {
    async function createPost(formData) {
       "use server";
       const title = formData.get("title");
       const image = formData.get("image");
       const content = formData.get("content");
 
       // console.log(title, image, content);

     await  storePost({
        imageUrl:'',
        title,
        content,
        userId: 1
       });
       redirect('/feed');
    }
 
    return (
       <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Create New Post</h1>
 
          <form action={createPost} className="space-y-4">
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
                <p className="form-actions">
                    <FormSubmit />
                </p>
             </div>
          </form>
       </div>
    );
 }