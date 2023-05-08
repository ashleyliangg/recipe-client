import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { deletePost, fetchPost, updatePost } from '../actions';

function PostItem() {
  const navigate = useNavigate();
  const { postID } = useParams();
  const dispatch = useDispatch();

  const post = useSelector((state) => (state.posts.current));

  const [isEditing, setEditing] = useState(false);
  const [loadedState, setLoadedState] = useState(false);
  const [localTitle, setLocalTitle] = useState('');
  const [localTags, setLocalTags] = useState('');
  const [localImgURL, setLocalImgURL] = useState('');
  const [localContent, setLocalContent] = useState('');

  const onTitleChange = (event) => {
    setLocalTitle(event.target.value);
  };

  const onTagChange = (event) => {
    setLocalTags(event.target.value);
  };

  const onImgURLChange = (event) => {
    setLocalImgURL(event.target.value);
  };

  const onContentChange = (event) => {
    setLocalContent(event.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchPost(postID));
      setLoadedState(true); // or some followup
      // console.log(loadedState);
    };
    fetch();
  }, []);

  useEffect(() => {
    setLocalTitle(post.title);
    setLocalTags(post.tags);
    setLocalImgURL(post.coverUrl);
    setLocalContent(post.content);
    console.log(post);
  }, [loadedState]);

  const update = async () => {
    const updated = {
      title: localTitle,
      tags: localTags,
      content: localContent,
      coverUrl: localImgURL,
    };
    await dispatch(updatePost(updated, postID));
    setEditing(!isEditing);
  };

  const deleteP = async () => {
    dispatch(deletePost(postID, navigate));
  };

  function renderPost() {
    if (!isEditing) {
      return (
        <div>
          <div className="top-icons">
            <i onClick={() => navigate('/')} role="button" tabIndex="0" aria-label="back" className="fa-solid fa-circle-arrow-left back-button" />
            <i onClick={() => setEditing(!isEditing)} role="button" tabIndex="0" aria-label="edit" className="fa-solid fa-pencil" />
          </div>
          <div className="post-item">
            <h1>{post.title}</h1>
            <p className="tags">{post.tags}</p>
            <ReactMarkdown>{`![](${post.coverUrl})`}</ReactMarkdown>
            <ReactMarkdown className="post-content">{post.content}</ReactMarkdown>
            <button className="big-button del-button" type="button" onClick={deleteP}>
              ✖️ Delete Post ✖️
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="top-icons">
            <i onClick={() => navigate('/')} role="button" tabIndex="0" aria-label="back" className="fa-solid fa-circle-arrow-left back-button" />
            <i onClick={update} role="button" tabIndex="0" aria-label="edit" className="fa-solid fa-circle-check" />
          </div>
          <div className="post-item">
            <p className="input-names">
              Title
            </p>
            <input className="form-input" value={localTitle} onChange={onTitleChange} />
            <p className="input-names">
              Tags
            </p>
            <input className="form-input" value={localTags} onChange={onTagChange} />
            <p className="input-names">
              Img URL
            </p>
            <input className="form-input" value={localImgURL} onChange={onImgURLChange} />
            <p className="input-names">
              Content
            </p>
            <input className="form-input" value={localContent} onChange={onContentChange} />
            <button className="big-button del-button" type="button" onClick={deleteP}>
              ✖️ Delete Post ✖️
            </button>
          </div>
        </div>
      );
    }
  }
  return (
    <div>
      {renderPost()}
    </div>
  );
}

export default PostItem;
