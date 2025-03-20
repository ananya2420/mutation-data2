

import Posts from "../components/posts";
import { getPosts } from "../lib/posts";
export default async function FeedPage(){
    
    const posts = await getPosts();
    return(
        <div>
            <Posts posts={posts} />
        </div>
    )

}