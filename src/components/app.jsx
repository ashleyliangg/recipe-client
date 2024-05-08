import React from 'react';
import {
	BrowserRouter, Routes, Route,
} from 'react-router-dom';
import NavBar from './navbar';
import NewPost from './new_post';
import PostItem from './post_item';
import Posts from './posts';
import Home from './home';

function App() {
	return (
		<BrowserRouter>
			<div>
				<NavBar />
					<div className="main-content">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/posts/" element={<Posts />} />
							<Route path="/posts/new" element={<NewPost />} />
							<Route path="/posts/:postID" element={<PostItem />} />
							<Route path="*" element={<div>post not found </div>} />
						</Routes>
					</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
