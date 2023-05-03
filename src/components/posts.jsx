import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
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
      <div key={post.id} className="post-container">
        <NavLink to={`posts/${post.id}`}>
          <ReactMarkdown className="cover-img">{`![](${post.coverUrl})`}</ReactMarkdown>
          <div>{post.title}</div>
          <div>{post.tags}</div>
        </NavLink>
      </div>
    );
  });
  return (
    <div className="posts-container">
      {postItems}
    </div>
  );
}

export default Posts;
