import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router';

function Home() {
	const navigate = useNavigate();
  return (
		<div className="landing-page-container">
			<TypeAnimation
				sequence={[
					'Recipes at your fingertips',
				]}
				wrapper="span"
				speed={50}
				className="animated-title"
			/>
			<div className="button-container">
				<button type="button" className="button" onClick={() => navigate('/posts/')}>START COOKING</button>
			</div>
		</div>
	);
}

export default Home;
