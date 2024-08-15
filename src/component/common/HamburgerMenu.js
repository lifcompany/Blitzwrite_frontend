// src/HamburgerMenu.js

import React, { useState, useEffect, useRef } from 'react';
import LogoGroup from './LogoGroup';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';


const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleClickMenu = (path) => {
        navigate(path);
        closeMenu();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    return (
        <>
            <button
                className="absolute xl:hidden top-10 right-4 focus:outline-none"
                onClick={toggleMenu}
            >
                <div className={`hamburger ${isOpen ? 'open' : ''}`}>
                    <span className="block w-8 h-1 rounded-xl bg-gray-800 mb-1 transition-transform"></span>
                    <span className="block w-8 h-1 rounded-xl bg-gray-800 mb-1 transition-transform"></span>
                    <span className="block w-8 h-1 rounded-xl bg-gray-800 transition-transform"></span>
                </div>
            </button>
            <div
                ref={menuRef}
                className={`menu ${isOpen ? 'open' : ''} bg-white shadow-md p-5 h-screen z-50`}
            >
                <div className=' py-5 mb-5'>
                    <LogoGroup />
                </div>

                <div>
                    <MenuItem
                        onClick={() => handleClickMenu('/artgen/setkeyword')}
                        disableRipple
                        sx={{
                            color: '#232e2f',
                            '&:hover': {
                                backgroundColor: 'rgba(229, 231, 235, 0.5)'
                            },
                            fontSize: '18px',
                            fontWeight: '500'
                        }}
                    >
                        <EditIcon fontSize='18' className='mr-2' />
                        作成
                    </MenuItem>
                    {/* <MenuItem
                        onClick={() => handleClickMenu('/keyword')}
                        disableRipple
                        sx={{
                            color: '#232e2f',
                            '&:hover': {
                                backgroundColor: 'rgba(229, 231, 235, 0.5)'
                            },
                            fontSize: '18px',
                            fontWeight: '500'
                        }}
                    >
                        <FileCopyIcon fontSize='18' className='mr-2' />
                        Keyword
                    </MenuItem> */}
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem
                        onClick={() => handleClickMenu('/artgen/generated')}

                        disableRipple
                        sx={{
                            color: '#232e2f',
                            '&:hover': {
                                backgroundColor: 'rgba(229, 231, 235, 0.5)'
                            },
                            fontSize: '18px',
                            fontWeight: '500'
                        }}
                    >
                        <ArchiveIcon fontSize='18' className='mr-2' />
                        一覧
                    </MenuItem>
                    <MenuItem onClick={closeMenu} disableRipple
                        sx={{
                            color: '#232e2f',
                            '&:hover': {
                                backgroundColor: 'rgba(229, 231, 235, 0.5)'
                            },
                            fontSize: '18px',
                            fontWeight: '500'
                        }}
                    >
                        <MoreHorizIcon fontSize='18' className='mr-2' />
                        More
                    </MenuItem>
                </div>

            </div>
        </>
    );
};

export default HamburgerMenu;
