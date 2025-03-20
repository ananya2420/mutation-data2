//formatDate, likeButton

import LikeButton from './like-icon/LikeButton'; // Corrected import
import { formatDate } from '../utils/formatDate'; // Ensure this function exists
import { togglePostLikeStatus } from '../action/posts';

function Post({ post }) { // Fixed function to accept `post` as a prop
    return (
        <article className="post">
            <div className="post-image">
                <img src={post.image} alt={post.title} />
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
                        <LikeButton action={togglePostLikeStatus}/>
                    </div>
                </header>
                <p>{post.content}</p>
            </div>
        </article>
    );
}

export default function Posts({ posts }) { // Fixed `posts` usage
    if (!posts || posts.length === 0) { // Corrected `posts.length` check
        return <p>There are no posts yet. Maybe start sharing some?</p>;
    }

    return (
        <ul className="posts">
            {posts.map((post) => (
                <li key={post.id}>
                    <Post post={post} /> 
                </li>
            ))}
        </ul>
    );
}
