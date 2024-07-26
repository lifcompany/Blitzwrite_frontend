import React, { useEffect, useState } from "react";
import axios from "axios";
// const [credit, setCredit] = useState("");
// useEffect(() => {
//     const getCredit = () => {
//         // axios.post(
//         //     `${apiUrl}/api/authentication/check-premium/`,
//         //     {},
//         //     {
//         //         headers: {
//         //             Accept: "application/json",
//         //             Authorization: `Bearer ${token}`,
//         //         },
//         //     }
//         // )
//         //     .then(response => {
//         //         setPremiumStatus(response.data.status);
//         //     })
//         //     .catch(error => {
//         //         if (error?.response?.data && error?.response?.status === 500) {
//         //             setPremiumStatus(error?.response?.data?.status);
//         //         } else {
//         //             setPremiumStatus('is not premium');
//         //         }
//         //     });
//     };

//     getCredit();
// }, []);

const Progress = () => {
    const [profile, setProfile] = useState({});
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        
        axios.get(`${apiUrl}/api/generate/get-user-credit/`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(response => {
                console.log(response.data);
                setProfile(response.data);
            })
            .catch(error => {
                setError(error.response.data);
                console.log(error.response.data);
            });
    }, []);

    return (
        <div className='flex flex-col gap-1'>
            <p className='text-[14px]'>残クレジット：{profile.credits}</p>
            <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-600">
                <div className="h-3 bg-[#628CF8]" style={{ width: "45%" }}></div>
            </div>
        </div>
    );
}

export default Progress;