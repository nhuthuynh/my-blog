import React from 'react';

const CommentsList = ({ comments }) => (
    <>
        <h3>Comments: </h3>
    {
        comments.map((comment, key) => (
                <div className="comment" key={key}>
                    <h4>{comment.title}</h4>
                    <p>{comment.content}</p>
                </div>
            ))
    }
    </>
)

export default CommentsList;