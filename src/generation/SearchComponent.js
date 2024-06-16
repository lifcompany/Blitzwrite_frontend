import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
    const [keyword, setKeyword] = useState('');
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const handleSearch = async () => {
        console.log(keyword);
        try {
            
            const response = await axios.post(`${apiUrl}/api/explorer/get_questions/`, { keyword });
            setQuestions(response.data.questions);
            setError('');
        } catch (err) {
            setError('Failed to fetch data');
        }
    };

    return (
        <div>
            <h1>Best Google Search Keyword Explorer</h1>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter a keyword"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
            </ul>
            <p>
                Need any help with SEO? Feel Free to Reach Out Me On <a href="https://www.linkedin.com/in/muhammadahmed786/">LinkedIn</a>
            </p>
        </div>
    );
};

export default SearchComponent;
