'use client';  // This tells Next.js this component is client-side

import LikeButton from './like-icon/LikeButton';
import { togglePostLikeStatus } from '../action/posts';
import formatDate from '../lib/format';
import { useOptimistic } from 'react';
import Image from 'next/image';


function imageLoader(config){
    //console.log(config);
    const urlStart=config.src.split('upload/')[0];
    const urlEnd=config.src.split('upload/')[1];
    const transformations=`w_200,h_150,q_${config.quality}`
    return `${urlStart}upload/${transformations}/${urlEnd}`;

}
function Post({ post, action }) {
    const handleLike = (event) => {
        event.preventDefault(); // Prevent form submission refresh
        action(post.id); // Use the action passed from parent component
    };

    return (
        <article className="post">
            <div className="post-image">
                {post.image ? (
                    <Image loader={imageLoader} src={post.image} fill alt={post.title} quality={50} />
                ) : (
                    <div className="placeholder-image">No Image Available</div> // Placeholder
                )}
            </div>
            <div className="post-content">
                <header>
                    <div>
                        <h2>{post.title}</h2>
                        <p>
                            Shared by {post.userFirstName} on{' '}
                            <time dateTime={post.createdAt}>
                                {formatDate(post.createdAt)}
                            </time>
                        </p>
                    </div>
                    <div>
                        <form onSubmit={handleLike} className={post.isLiked ? 'liked' : ''}>
                            <LikeButton />
                        </form>
                    </div>
                </header>
                <p>{post.content}</p>
            </div>
        </article>
    );
}

export default function Posts({ posts = [] }) {  // Ensure posts is always an array

    const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId) => {
        const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId);

        if (updatedPostIndex === -1) {
            return prevPosts;
        }
        const updatedPost = { ...prevPosts[updatedPostIndex] };
        updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
        updatedPost.isLiked = !updatedPost.isLiked;
        const newPosts = [...prevPosts];
        newPosts[updatedPostIndex] = updatedPost;
        return newPosts;
    });

    if (!optimisticPosts || optimisticPosts.length === 0) {
        return <p>There are no posts yet. Maybe start sharing some?</p>;
    }

    async function updatePost(postId) {
        updateOptimisticPosts(postId); // Update the post optimistically
        await togglePostLikeStatus(postId); // Call the API after the optimistic update
    }

    return (
        <ul className="posts">
            {optimisticPosts.map((post, index) => (
                <li key={post.id || `post-${index}`}> {/* Fallback key if post.id is missing */}
                    <Post post={post} action={updatePost} />
                </li>
            ))}
        </ul>
    );
}
