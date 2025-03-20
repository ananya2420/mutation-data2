// src/app/new-post/page.js

//import { redirect } from "next/navigation";

"use client";
import PostForm from "../components/post-form";
//import { storePost } from "../lib/posts";
import { createPost } from "../lib/serverActions";

//"use client";  // Ensure this is a client-side component

//import { useState } from "react";
//import FormSubmit from "../components/form-submit";


export default function NewPostPage(){
    
      return <PostForm action={createPost}/>
}