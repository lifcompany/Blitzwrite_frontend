import React, { useState, useRef, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from './Button';
import axios from 'axios';

const CustomTextarea = ({ onKeywordsGenerated }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && content.trim()) {
      e.preventDefault();
      const newTag = { id: Date.now().toString(), text: content.trim() };
      setTags([...tags, newTag]);
      setContent('');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Example API service setup
      const apiService = {
        setToken: (token) => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        generateKeywords: (tags) => {
          return axios.post(
            'http://localhost:8000/keyword/generate',
            {
              keywords: tags.map(tag => tag.text)
            },
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
        }
      };

      apiService.setToken(token);
      const response = await apiService.generateKeywords(tags);
      const newKeywords = response.data;
      setKeywords(newKeywords);
      onKeywordsGenerated(newKeywords);
    } catch (error) {
      console.error('Error generating keywords:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [tags]);

  return (
    <>
      <div className="p-4 h-[150px] border rounded-xl bg-white">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              onClick={() => removeTag(tag.id)}
              className="flex gap-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-md items-center cursor-pointer"
            >
              {tag.text}
              <IoMdClose size={15} />
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            className="flex-grow outline-none tracking-tighter"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Input keyword and press Enter"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          className="custom-class"
          onClick={handleSave}
          common
          label="Generate"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default CustomTextarea;
