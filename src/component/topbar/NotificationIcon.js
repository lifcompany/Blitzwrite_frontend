import React from 'react';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NotificationIcon = ({ count_noti, array_noti }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickMenu = (path) => {
        navigate(path);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            <Badge badgeContent={count_noti ? count_noti : 0} color="error"
                sx={{
                    '& .MuiBadge-standard': {
                        width: 17,
                        height: 17,
                        fontSize: '0.7rem',
                    },
                }}
            >
                <button
                    className="relative middle none font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-lg text-xs text-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                    type="button"
                    onClick={handleClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5 text-blue-gray-500"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </Badge>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        minWidth: '250px', // Set your desired width here
                        maxWidth: '375px',
                        paddingY: '15px'
                    }
                }}
            >
                {array_noti.map((noti, index) => (
                    <div className=' cursor-pointer hover:bg-blue-100' onClick={() => handleClickMenu('/artgen/generated')}>
                        <Typography sx={{ p: 2 }}>{noti}</Typography>
                    </div>
                ))}
            </Popover>
        </>


    );
};

export default NotificationIcon;
