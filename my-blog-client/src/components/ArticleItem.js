import React from 'react';
import { Link } from 'react-router-dom';

const ArticleItem = ({ name, title, content }) => (
    <Link to={`/article/${name}`}>
        <h3>{title}</h3>
        <p>{content[0].substring(0, 150)}...</p>
    </Link>
)

export default ArticleItem;