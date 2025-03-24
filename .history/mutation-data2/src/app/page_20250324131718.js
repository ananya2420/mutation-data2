//import Image from "next/image";
import { Suspense } from "react";
import { getPosts } from "./lib/posts";
import Posts from "./components/posts";

export const metadata={
  title: 'Latest Posts',
  description
}


async function LatestPosts(){
  const LatestPosts=await getPosts(2);
  return <Posts posts={LatestPosts} />
}

export default function Home() {
  return (
   <>
   <h1>Welcome back!</h1>
   <p>Here is what you might have missed.</p>
   <section id="latest-posts">
    <Suspense fallback={<p>Loading recent posts...</p>}>
    
    
    </Suspense>

   </section>

   </>
  );
}
