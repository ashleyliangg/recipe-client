/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { deletePost, fetchPost, updatePost } from '../actions';

function SingleRecipe() {
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
	const [localFavorite, setLocalFavorite] = useState(post.favorite);

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
    };
    fetch();
  }, []);

  useEffect(() => {
    setLocalTitle(post.title);
    if (post.tags) {
      setLocalTags(post.tags.join(' '));
    }
    if (post.coverUrl) {
      setLocalImgURL(post.coverUrl);
    }
    if (post.content) {
      setLocalContent(post.content);
    }
  }, [loadedState]);

  const update = async () => {
    const updated = {
      title: localTitle,
      tags: localTags,
      content: localContent,
      coverUrl: localImgURL,
			favorite: localFavorite,
    };
		console.log(updated);
    await dispatch(updatePost(updated, postID));
    setEditing(!isEditing);
  };

  const deleteP = async () => {
    dispatch(deletePost(postID, navigate));
  };

	const favoritePost = async () => {
		setLocalFavorite(!localFavorite);
		console.log(post);
		const updatedRecipe = {
			title: post.title,
      tags: post.tags.join(' '),
      content: post.content,
      coverUrl: post.coverUrl,
			favorite: !post.favorite,
		};
		console.log(updatedRecipe);
		await dispatch(updatePost(updatedRecipe, postID));
	};

  function postTags() {
    if (loadedState) {
      // check if empty array
      if (post.tags[0] !== '') {
        return (
        // check to make sure no extra spaces
          post.tags.map((tag, i) => {
            if (tag) {
              return (<p key={i} className="posts-tag">{tag}</p>);
            } else {
              return (<p key={i} />);
            }
          })
        );
      }
    }
    return (<p />);
  }

  function renderPost() {
    if (!isEditing) {
      return (
        <div>
          <div className="top-icons">
            <i onClick={() => navigate('/posts/')} role="button" tabIndex="0" aria-label="back" className="fa-solid fa-circle-arrow-left back-button icon-button" />
						<i onClick={favoritePost} role="button" tabIndex="0" className="fa fa-star" aria-label="favorite" style={{ color: localFavorite ? '#FDDA0D' : '#D3D3D3' }} />
            <i onClick={deleteP} role="button" tabIndex="0" aria-label="delete" className="fa-solid fa-trash-can trash icon-button" />
          </div>
          <div className="post-item">
            <h1>{post.title}</h1>
            <div className="posts-tags">
              {postTags()}
            </div>
            <ReactMarkdown className="post-cover">{`![](${post.coverUrl})`}</ReactMarkdown>
            <ReactMarkdown className="post-content">{post.content}</ReactMarkdown>
            <button className="big-button upd-button" type="button" onClick={() => setEditing(!isEditing)}>
              ✏️ Update Post ✏️
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="top-icons">
            <i onClick={() => navigate('/posts/')} role="button" tabIndex="0" aria-label="back" className="fa-solid fa-circle-arrow-left back-button" />
						<i onClick={favoritePost} role="button" tabIndex="0" className="fa fa-star" aria-label="favorite" style={{ color: localFavorite ? '#FDDA0D' : '#D3D3D3' }} />
            <i onClick={update} role="button" tabIndex="0" aria-label="edit" className="fa-solid fa-circle-check" />
          </div>
          <div className="post-item">
            <p className="input-names">
						Name of Dish
            </p>
            <input className="form-input" value={localTitle} onChange={onTitleChange} />
            <p className="input-names">
              Tags (space between tags)
            </p>
            <input className="form-input" value={localTags} onChange={onTagChange} />
            <p className="input-names">
              Img URL
            </p>
            <input className="form-input" value={localImgURL} onChange={onImgURLChange} />
            <p className="input-names">
              Recipe
            </p>
            <textarea
              name="editing-content"
              rows="10"
              cols="1"
              className="content-input"
              value={localContent}
              onChange={onContentChange}
            />
            {/* <input className="form-input" value={localContent} onChange={onContentChange} /> */}
            <button className="big-button upd-button" type="button" onClick={update}>
              ⭐ Save Updates ⭐
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

export default SingleRecipe;
