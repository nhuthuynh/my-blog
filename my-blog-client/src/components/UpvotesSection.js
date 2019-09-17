import React from 'react';

const UpvotesSection = ({ upvotes, articleName, setArticleInfo }) => {
    const upvoteArticle = async () => {
        const result = await fetch(`/api/articles/${articleName}/upvote`, {
            method: 'post',

        });

        const body = await result.json();
        setArticleInfo(body);
    }

    return (
    <div className="upvotes-section">
        <button onClick={upvoteArticle}>Add Upvote</button>
        <p>
            <b>This post has been upvoted { upvotes } times!</b>
        </p>
    </div>)
};

export default UpvotesSection;