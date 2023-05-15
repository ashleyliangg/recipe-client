/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { fetchPosts } from '../actions';

function Posts(props) {
  const dispatch = useDispatch();

  const posts = useSelector((state) => (state.posts.all));

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const postItems = posts.map((post) => {
    function postTags() {
      if (post.tags[0] !== '') {
        return (
          post.tags.map((tag, i) => {
            if (tag) {
              return (<p key={i} className="posts-tag">{tag}</p>);
            } else {
              return (<p key={i} />);
            }
          })
        );
      } else {
        return (<p />);
      }
    }
    return (
      <NavLink key={post.id} className="navlink" to={`posts/${post.id}`}>
        <div className="post-container">
          <ReactMarkdown className="cover-img">{`![](${post.coverUrl})`}</ReactMarkdown>
          <div className="posts-title">{post.title}</div>
          <div className="posts-tags">
            {postTags()}
          </div>
        </div>
      </NavLink>
    );
  });
  return (
    <div>
      <h1>Animal life!</h1>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}>
        <Masonry className="posts-container">
          {postItems}
        </Masonry>
      </ResponsiveMasonry>
      {/* <div className="posts-container">
        {postItems}
      </div> */}
    </div>
  );
}

export default Posts;
