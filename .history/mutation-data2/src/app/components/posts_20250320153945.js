//formatDate, likeButton

import {LikeButton} from './like-icon'

function post(){
    return(
        <article className="post">
            <div className="post-image">
                <img src={post.image} alt={post.title} />

            </div>
            <div className="post-content">
                <header>
                    <div>
                        <h2>{post.title}</h2>
                        <p>
                            Shared by {post.userFirstName} on{''}
                            <time dateTime={post.createAt}>
                            {formatDate(post.createdAt)}
                            </time>
                        </p>
                    </div>
                    <div>
                    <LikeButton />
                    </div>
                </header>
                <p>{post.content}</p>
            </div>

        </article>

         
    )
}
export default function Posts({posts}){
    if(!posts || Posts.length===0){
        return <p>There are no post yet. Maybe start sharing some?</p>
    }
    return(
        <ul className="Posts">

        </ul>
    )
}