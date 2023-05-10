import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById } from './postsSlice';

import {selectAllUsers} from "../users/userSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditPostForm = () => {
    const {postId} = useParams();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.title);
    const [userId, setUserId] = useState(post?.userId);
    const [requestStatus, setRequestStatus] = useState('idle');
    
    const dispatch = useDispatch();

    if(!post) {
        return (
            <section>
                <h2>Post not found</h2>
            </section>
        )
    }

    const onTitleChange = e => setTitle(e.target.value);
    const onContentChange = e => setContent(e.target.value);
    const onAuthorChange = e => setUserId(e.target.value);

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if(canSave) {
            try {
                setRequestStatus('Pending');
                dispatch()//will start from here
            } catch (error) {
                console.log('Failed to save the post', err);
            }
        }
    }

}