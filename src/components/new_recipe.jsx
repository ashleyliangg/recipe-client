import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createPost } from '../actions';

function NewRecipe() {
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
      <i onClick={() => navigate('/posts/')} role="button" tabIndex="0" aria-label="back" className="fa-solid fa-circle-arrow-left icon-button" />
      <div className="new-post-header">
        <h1>Create a New Post</h1>
      </div>

      <div className="new-post-form">
        <i onClick={() => navigate('/posts/')} role="button" tabIndex="0" aria-label="delete" className="fa-solid fa-trash-can trash icon-button" />
        <p className="input-names">
          Name of Dish
        </p>
        <input className="form-input" value={newTitle} onChange={onTitleChange} />
        <p className="input-names">
          Tags (space between tags)
        </p>
        <input className="form-input" value={newTags} onChange={onTagChange} />
        <p className="input-names">
          Img URL
        </p>
        <input className="form-input" value={newImgURL} onChange={onImgURLChange} />
        <p className="input-names">
          Recipe
        </p>
        {/* <input className="form-input" value={newContent} onChange={onContentChange} /> */}
        <textarea
          name="editing-content"
          rows="10"
          cols="1"
          className="content-input"
          value={newContent}
          onChange={onContentChange}
        />
        <button className="big-button new-button" type="button" onClick={addPost}>Add Recipe!</button>
      </div>
    </div>
  );
}

export default NewRecipe;
