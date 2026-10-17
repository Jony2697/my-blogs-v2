import React, { useEffect, useState } from 'react';
import { IoBookmarkSharp } from 'react-icons/io5';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ bookmarkCount }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
            <div className="navbar w-11/12 max-w-7xl mx-auto">
                <div className="flex-1">
                    <a className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer">
                        My Blogs
                    </a>
                </div>

                <div className="flex-none flex items-center gap-2">
                    {/* Theme toggle */}
                    <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="btn btn-ghost btn-circle"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <FiMoon className="text-xl" /> : <FiSun className="text-xl" />}
                    </button>

                    {/* Bookmark count */}
                    <div className="indicator">
                        {bookmarkCount > 0 && (
                            <span className="indicator-item badge badge-secondary badge-sm">{bookmarkCount}</span>
                        )}
                        <button className="btn btn-ghost btn-circle">
                            <IoBookmarkSharp className="text-xl" />
                        </button>
                    </div>

                    {/* Profile */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    alt="profile"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
                        >
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge badge-primary">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;