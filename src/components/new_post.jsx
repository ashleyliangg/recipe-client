import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createPost } from '../actions';

function NewPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newTitle, setNewTitle] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newImgURL, setNewImgURL] = useState('');
  const [newContent, setNewContent] = useState('');

  const onTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const onTagChange = (event) => {
    setNewTags(event.target.value);
  };

  const onImgURLChange = (event) => {
    setNewImgURL(event.target.value);
  };

  const onContentChange = (event) => {
    setNewContent(event.target.value);
  };

  const addPost = async () => {
    const newPost = {
      title: newTitle,
      tags: newTags,
      content: newContent,
      coverUrl: newImgURL,
    };
    await dispatch(createPost(newPost, navigate));
  };

  return (
    <div className="new-post">
      <div className="new-post-header">
        <h1>Create a New Post</h1>
        <button type="button" onClick={() => navigate('/')}>Delete</button>
      </div>

      <div className="new-post-form">
        <p>
          Title
        </p>
        <input value={newTitle} onChange={onTitleChange} />
        <p>
          Tags
        </p>
        <input value={newTags} onChange={onTagChange} />
        <p>
          Img URL
        </p>
        <input value={newImgURL} onChange={onImgURLChange} />
        <p>
          Content
        </p>
        <input value={newContent} onChange={onContentChange} />
        <button type="button" onClick={addPost}>Add Post!</button>
      </div>
    </div>
  );
}

export default NewPost;
