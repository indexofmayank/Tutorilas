import {useSelector} from 'react-redux';
import {selectAllPosts} from "../posts/postsSlice";
import PostAuthor from './PostAuthor';
import TimeAgo from "./TimeAgo";


const PostsList = () => {
    const post = useSelector(selectAllPosts);
    const posts = useSelector(selectAllPosts);
    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))


    const renderedPosts = posts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p>
                <PostAuthor userId={post.userid} />
                <TimeAgo timestamp={post.date} />
            </p>
        </article>
    ))

        return (
            <section>
                <h2>Posts</h2>
                {renderedPosts}
            </section>
        )

}


export default PostsList;