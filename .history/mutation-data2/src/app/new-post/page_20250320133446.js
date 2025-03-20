// src/app/new-post/page.js

import PostForm from "../components/post-form";

//"use client";  // Ensure this is a client-side component

//import { useState } from "react";
//import FormSubmit from "../components/form-submit";
//import { createPost } from "../lib/serverActions";// Import server-side logic

export default function NewPostPage(){
    async function createPost(formData) {
        "use server";
        const title = formData.get("title");
        const image = formData.get("image");
        const content = formData.get("content");

        let errors=[];
        if(!title || title.trim().length ===0){
            errors.push("title is required.");

        }
        if(!content || content.trim().length===0){
            errors.push("content is required.");
        }
        if(!image){
            errors.push("image is required.");
        }
        if(errors.length>0){
            return {errors};

        }
        await storePost({
            imageUrl: '',
            title,
            content,
            userId: 1,
         });
         redirect('/feed');
      }
      return <PostForm />
}