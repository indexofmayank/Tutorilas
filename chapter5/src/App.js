import React from "react";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import UserPage from "./features/users/UserPage";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import UserList from './features/users/UserList';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
          <Route path="post">
            <Route index element={<AddPostForm />} />
              <Route  element={<PostsList />} />
              <Route path=":postId" element={<SinglePostPage />} />
              <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UserList />} />
            <Route path=":userId" element={<UserPage />} />
        </Route>


      </Route>

    </Routes>
  );
}

export default App;
