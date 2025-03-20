import Posts from "../components/posts";
import { getPosts } from "../lib/posts";

export default function FeedPage() {
    return (
        <div>
            <h1>All posts by all users</h1>
            <PostList />
        </div>
    );
}

async function PostList() {
    const posts = await getPosts();
    return <Posts posts={posts} />;
}
