import React from 'react';
import {
	BrowserRouter, Routes, Route,
} from 'react-router-dom';
import NavBar from './navbar';
import NewRecipe from './new_recipe';
import SingleRecipe from './single_recipe';
import Recipes from './recipes';
import Home from './home';

function App() {
	return (
		<BrowserRouter>
			<div>
				<NavBar />
					<div className="main-content">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/posts/" element={<Recipes />} />
							<Route path="/posts/new" element={<NewRecipe />} />
							<Route path="/posts/:postID" element={<SingleRecipe />} />
							<Route path="*" element={<div>post not found </div>} />
						</Routes>
					</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
