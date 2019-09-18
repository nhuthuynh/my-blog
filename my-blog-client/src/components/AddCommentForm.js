import React, { useState, useEffect } from 'react';

export default ({ articleName, setArticleInfo }) => {
    
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");

    const addComment = async () => {
        const result = await fetch(`/api/articles/${articleName}/comments`, {
            method: 'POST',
            body: JSON.stringify({ username, content }),
            headers: {
                'Content-Type': 'application/json', // tell server what kind of data we pass along
            }
        })

        const body = await result.json();
        setArticleInfo(body);
        resetForm();
    }

    const resetForm = () => {
        setContent('');
        setUsername('');
    }


    return (
    <div className="comment-container">
        <h3>Add comment</h3>
        <label>
            Name: 
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
            Comment:
            <textarea rows="4" cols="50" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </label>
        <button onClick={addComment}>Add comment</button>
    </div>
)};