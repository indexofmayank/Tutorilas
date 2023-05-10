import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";

const PostAuthor = (userId) => {
    const users = useSelector(state => state.users);

    const author = users.find( user => user.id === userId)
    console.log(author);

    return <span>by: {author ? author.name : 'Unknow-author'}</span>
}

export default PostAuthor

 