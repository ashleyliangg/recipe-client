/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { NavLink } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import {
	Box,
	Tab,
	// IconButton,
} from '@mui/material';
import {
	TabContext,
	TabList,
	TabPanel,
} from '@mui/lab';
// import StarIcon from '@mui/icons-material/Star';
import { fetchPosts } from '../actions';

const posts = (postType, nameFilter, tagFilter) => {
	const filteredPosts = postType.filter((post) => {
		// Check if the post's title contains the given title substring
		// Case insensitive search
		let titleMatch = true;
		if (nameFilter) {
			titleMatch = post.title.toLowerCase().includes(nameFilter.toLowerCase());
		}

		// Check if all required tags are included in the post's tags
		// Assumes tags in both post.tags and requiredTags are normalized to lower case
		let tagsMatch = true;
		if (tagFilter) {
			tagsMatch = tagFilter.every((requiredTag) => post.tags.map((postTag) => postTag.toLowerCase()).includes(requiredTag.toLowerCase()));
		}

		// Return true if both titleMatch and tagsMatch are true, false otherwise
		return titleMatch && tagsMatch;
	});
	const postItems = filteredPosts.map((post) => {
		function postTags() {
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
			} else {
				return (<p />);
			}
		}

		return (
			<NavLink key={post.id} className="navlink" to={`${post.id}`}>
				<div className="post-container">
					{/* <IconButton aria-label="favorite" > */}
					<i className="fa fa-star" aria-label="favorite" style={{ color: post.favorite ? '#FDDA0D' : '#D3D3D3', alignSelf: 'flex-start' }} />
					{/* <StarIcon style={{ color: post.favorite ? '#FDDA0D' : '#D3D3D3', alignSelf: 'flex-start' }} /> */}
					{/* </IconButton> */}
					{post.coverUrl ? <ReactMarkdown className="cover-img">{`![](${post.coverUrl})`}</ReactMarkdown> : null}
					<div className="posts-title">{post.title}</div>
					<div className="posts-tags">
						{postTags()}
					</div>
				</div>
			</NavLink>
		);
	});

	return (
		<ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}>
			<Masonry className="posts-container">
				{postItems}
			</Masonry>
		</ResponsiveMasonry>
	);
};

function Posts() {
	const dispatch = useDispatch();

	const [tempNameFilter, setTempNameFilter] = useState('');
	const [tempTagFilter, setTempTagFilter] = useState('');

	const [nameFilter, setNameFilter] = useState('');
	const [tagFilter, setTagFilter] = useState([]);

	const allPosts = useSelector((state) => (state.posts.all));
	const favPosts = useSelector((state) => state.posts.all.filter((post) => post.favorite));

	useEffect(() => {
		dispatch(fetchPosts());
	}, []);

	const handleNameChange = (event) => {
		setTempNameFilter(event.target.value);
	};

	const handleTagChange = (event) => {
		setTempTagFilter(event.target.value);
	};

	const handleNameSearch = () => {
		setNameFilter(tempNameFilter);
	};

	const handleTagSearch = () => {
		const tags = [];
		tempTagFilter.split(' ').forEach((tag) => {
			const trimmedTag = tag.trim();
			if (trimmedTag.length !== 0) {
				tags.push(trimmedTag);
			}
		});
		setTagFilter(tags);
	};

	const search = () => (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div className="search-container">
				<input
					type="text"
					className="search-input"
					placeholder="Title of recipe"
					value={tempNameFilter}
					onChange={handleNameChange}
				/>
				<button type="button" className="search-button" onClick={handleNameSearch}>
					<i className="fa-solid fa-filter" /> Title
				</button>
			</div>
			<div className="search-container">
				<input
					type="text"
					className="search-input"
					placeholder="Filter by tags (spaces)"
					value={tempTagFilter}
					onChange={handleTagChange}
				/>
				<button type="button" className="search-button" onClick={handleTagSearch}>
					<i className="fa-solid fa-filter" /> Tags
				</button>
			</div>
			<button type="button" className="clear-button search-container" onClick={handleTagSearch}>
				Clear All Filters
			</button>
		</div>
	);

	const tabs = () => {
		const [selectedTab, setSelectedTab] = useState('all-recipes');
		const handleTabChange = (event, newValue) => {
			setSelectedTab(newValue);
		};
		return (
			<Box sx={{ width: '100%', typography: 'body1' }}>
				<TabContext value={selectedTab}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList
							onChange={handleTabChange}
							aria-label="recipe tabs"
							// textColor="#B6916C"
							// indicatorColor="success"
							sx={{
								'& .MuiTabs-indicator': {
									backgroundColor: 'success.main', // Assumes 'success' is a color defined in your theme
								},
								'& .MuiTab-root': {
									color: '#B6916C', // Custom color for all tab labels
								},
								'& .MuiTab-root.Mui-selected': {
									color: 'success.main', // Custom color for the selected tab label
								},
							}}
						>
							<Tab label="All Recipes" value="all-recipes" />
							<Tab label="Favorite Recipes" value="favorite-recipes" />
						</TabList>
					</Box>
					<TabPanel value="all-recipes">{posts(allPosts, nameFilter, tagFilter)}</TabPanel>
					<TabPanel value="favorite-recipes">{posts(favPosts, nameFilter, tagFilter)}</TabPanel>
				</TabContext>
			</Box>
		);
	};

	return (
		<div>
			<h1>Recipes</h1>
			{search()}
			{tabs()}
			{/* <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1000: 3 }}>
				<Masonry className="posts-container">
					{postItems}
				</Masonry>
			</ResponsiveMasonry> */}
		</div>
	);
}

export default Posts;
