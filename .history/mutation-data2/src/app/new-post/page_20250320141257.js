// src/app/new-post/page.js

import { redirect } from "next/navigation";
import PostForm from "../components/post-form";
import { storePost } from "../lib/posts";

//"use client";  // Ensure this is a client-side component

//import { useState } from "react";
//import FormSubmit from "../components/form-submit";
//import { createPost } from "../lib/serverActions";// Import server-side logic

export default function NewPostPage(){
    
      return <PostForm action={createPost}/>
}