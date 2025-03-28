"use server";

import { redirect } from "next/navigation";

import { storePost } from "../lib/posts";

export async function createPost(prevState,formData) {
       
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
        if(!image || image.size===0){
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