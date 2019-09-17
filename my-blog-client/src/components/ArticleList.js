import React from 'react';
import ArticleItem from './ArticleItem';

const ArticleList = ({ articles }) => (
        <>
            {   
                articles.map((article, key) => <ArticleItem {...article} key={key} />)
            }
        </>
    )

export default ArticleList;