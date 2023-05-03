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
          <button type="button" onClick={() => navigate('/')}>Back</button>
          <ReactMarkdown>{`![](${post.coverUrl})`}</ReactMarkdown>
          <h1>{post.title}</h1>
          <p>{post.tags}</p>
          <ReactMarkdown>{post.content}</ReactMarkdown>
          <div className="bottom-icons">
            <button type="button" onClick={deleteP}>Delete</button>
            <button type="button" onClick={() => setEditing(!isEditing)}>Edit</button>
            {/* <i onClick={() => dispatch(deletePost(postID, navigate))} role="button" tabIndex="0" aria-label="delete" className="fa-solid fa-trash-can" /> */}
            {/* <i onClick={() => setEditing(!isEditing)} role="button" tabIndex="0" aria-label="edit" className="fa-solid fa-pencil" /> */}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            Title
          </p>
          <input value={localTitle} onChange={onTitleChange} />
          <p>
            Tags
          </p>
          <input value={localTags} onChange={onTagChange} />
          <p>
            Img URL
          </p>
          <input value={localImgURL} onChange={onImgURLChange} />
          <p>
            Content
          </p>
          <input value={localContent} onChange={onContentChange} />
          <button type="button" onClick={update}>Update</button>
        </div>
      );
    }
  }
  return (
    renderPost()
  );
}

export default PostItem;
