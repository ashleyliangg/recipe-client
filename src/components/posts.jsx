import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { fetchPosts } from '../actions';

function Posts(props) {
  const dispatch = useDispatch();
  // const [loadedState, setLoadedState] = useState(false);

  const posts = useSelector((state) => (state.posts.all));

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  // useEffect(() => {
  //   posts = useSelector((state) => (state.posts.all));
  // }, [loadedState]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     await dispatch(fetchPosts());
  //     setLoadedState(true);
  //   };
  //   fetch();
  // }, []);

  const postItems = posts.map((post) => {
    return (
      <NavLink className="navlink" to={`posts/${post.id}`}>
        <div key={post.id} className="post-container">
          <ReactMarkdown className="cover-img">{`![](${post.coverUrl})`}</ReactMarkdown>
          <div className="posts-title">{post.title}</div>
          <div className="posts-tags">{post.tags}</div>
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
