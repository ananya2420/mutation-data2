
"use client";
import { useFormStatus } from "react-dom";


export default function FormSubmit(){
   const status = useFormStatus();

    return(
        <div>
            <button type='reset'>Reset</button>
            <button>Create Post</button>
        </div>
    )
}