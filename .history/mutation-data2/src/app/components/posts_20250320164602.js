'use client';  // This tells Next.js this component is client-side

import LikeButton from './like-icon/LikeButton';
import { togglePostLikeStatus } from '../action/posts';
import formatDate from '../lib/format';
import { useOptimistic } from 'react';

function Post({ post }) { 
    const handleLike = (event) => {
        event.preventDefault(); // Prevent form submission refresh
        togglePostLikeStatus(post.id);
    };

    return (
        <article className="post">
            <div className="post-image">
                {post.image ? (
                    <img src={post.image} alt={post.title} />
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

    const [optimisticPosts,updateOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId)=>{
        const updatedPostIndex = prevPosts.findIndex(post=>post.id===updatedPostId);

        if(updatedPostIndex === -1){
            return prevPosts;
        }
        const updatedPost = {...prevPosts[updatedPostIndex]}
        updatedPost.likes=updatedPost.likes+(updatedPost.isLiked?-1:1);
        updatedPost.isLiked=!updatedPost.isLiked;
        const newPosts=[...prevPosts];
        newPosts[updatedPostIndex]=updatedPost;

    });
    if (!optimisticPosts || optimisticPosts.length === 0) { 
        return <p>There are no posts yet. Maybe start sharing some?</p>;
    }

    return (
        <ul className="posts">
            {optimisticPosts.map((post, index) => (
                <li key={post.id || `post-${index}`}> {/* Fallback key if post.id is missing */}
                    <Post post={post} /> 
                </li>
            ))}
        </ul>
    );
}
