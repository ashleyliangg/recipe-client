import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
  return (
    <nav>
      <ul>
        <li><NavLink className="navlink" to="/"><i className="fa-solid fa-otter" /></NavLink></li>
        <li><NavLink className="navlink" to="/posts/new">New Post <i className="fa-solid fa-circle-plus" /></NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;
