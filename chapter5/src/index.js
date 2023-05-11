import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import {store} from "../src/app/store"
import '../src/index.css'
import {selectAllPosts} from './features/posts/postsSlice';
import { fetchUsers } from './features/users/userSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


store.dispatch(fetchUsers());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </Router>
      
    </Provider>
  </React.StrictMode>
);

