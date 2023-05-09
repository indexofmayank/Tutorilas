import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {postAdded} from "./postsSlice"
import {selectAllUsers} from "../users/userSlice"



const AddPostForm = () => {
    const disptach = useDispatch();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const users = useSelector(selectAllUsers);
    const [userId, setUserId] = useState(null);
    const onTitleChange = e => setTitle(e.target.value);
    const onContenChange = e => setContent(e.target.value);
    const onAuthorChange = e => setUserId(e.target.value);

    const onSavePostClicked = () => {
        if(title && content) {
            disptach(
                postAdded(title, content, userId)
            )

            setTitle('');
            setContent('');
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))




    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title: </label>
                <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChange}
                />
                <label htmlFor="postAuthor">Author: </label>
                <select id="postAuthor" value={userId} onChange={onAuthorChange} >
                    <option value="">
                    </option>
                    {userOptions}
                </select>

                <label htmlFor="postContent">Content: </label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContenChange}
                />
                <button type="button"
                 onClick={onSavePostClicked}
                    disabled={!canSave}
                 >Save Button</button>
            </form>

        </section>
    )
}

export default AddPostForm;