import React, { useEffect, useState } from "react";
import axios from "axios";
const Credit = () => {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        axios.get(`${apiUrl}/api/generate/get-user-credit/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log(response.data);
                setProfile(response.data);
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'An error occurred');
                console.log(error.response ? error.response.data : 'An error occurred');
            });
    }, [apiUrl, token]);

    const maxCredits = 5;
    const credits = profile.credits || 0;
    const progressWidth = Math.min((credits / maxCredits) * 100, 100);

    return (
        <div className='flex flex-col gap-1'>
            <p className='text-[14px]'>残クレジット：{credits}</p>
            <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-600">
                <div
                    className="h-3 bg-[#628CF8] transition-all duration-300"
                    style={{ width: `${progressWidth}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Credit;