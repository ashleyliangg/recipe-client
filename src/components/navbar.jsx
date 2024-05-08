import React from 'react';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><NavLink className="navlink" to="/posts/"><BakeryDiningOutlinedIcon fontSize="large" /></NavLink></li>
        <li><NavLink className="navlink create-button" to="/posts/new">New Recipe<AddIcon className="add-icon" /></NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
