import React from "react";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

function App() {
  return (
    <div>
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default App;
