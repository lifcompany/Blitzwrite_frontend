import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { setNotifications, clearNotifications, markAllAsRead } from '../../features/notificationSlice';
import { IoIosNotifications } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { format } from 'date-fns';
const NotificationIcon = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [visibleNotifications, setVisibleNotifications] = useState(10);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { notifications, unreadCount } = useSelector((state) => state.notifications);

    const sortedNotifications = [...notifications].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        dispatch(clearNotifications());
        axios.get(`${apiUrl}/api/notifications/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                const notification_data = response.data
                dispatch(setNotifications(notification_data));
                // console.log(notification_data);
                // notification_data.forEach(notification => {
                //     dispatch(addNotification(notification));
                // });
            })
            .catch(error => console.error('Error fetching notifications:', error));
    }, []);

    const handleClick = async (event) => {
        setAnchorEl(event.currentTarget);
        try {
            await axios.post(`${apiUrl}/api/notifications/mark-all-as-read/`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        dispatch(markAllAsRead());
    };

    const handleClickMenu = (path) => {
        navigate(path);
    };

    const showMoreNotifications = () => {
        setVisibleNotifications((prevCount) => prevCount + 10); // Show 10 more notifications
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Badge
                badgeContent={unreadCount}
                color="error"
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
                        paddingY: '15px',
                        maxHeight: '600px',
                        overflowY: 'hidden',
                    }
                }}
            >
                {sortedNotifications.length === 0 ? (
                    <Typography sx={{ p: 2 }}>No Notifications</Typography>
                ) : (
                    sortedNotifications.slice(0, visibleNotifications).map((noti, index) => (
                        <div
                            key={index}
                            className='cursor-pointer hover:bg-blue-100 flex items-center px-4'
                            onClick={() => handleClickMenu('/artgen/generated')}
                        >
                            {noti.read ? (
                                <IoIosNotificationsOutline className="mr-2 text-gray-600" size={24} />
                            ) : (
                                <IoIosNotifications className="mr-2 text-gray-600" size={24} />
                            )}
                            <Typography sx={{ pt: 2, pb: 2 }}>{noti.content}</Typography>
                            <Typography sx={{ p: 2, fontSize: '0.8rem', color: 'gray' }}>
                                {format(new Date(noti.timestamp), 'yyyy/MM/dd HH:mm')}
                            </Typography>
                        </div>
                    ))
                )}
                {sortedNotifications.length > visibleNotifications && (
                    <div className="cursor-pointer hover:bg-gray-200 text-center py-2" onClick={showMoreNotifications}>
                        <Typography sx={{ px: 2, fontSize: '0.9rem', fontWeight: 'bold' }}>
                        もっと見る
                        </Typography>
                    </div>
                )}
            </Popover>
        </>
    );
};

export default NotificationIcon;
