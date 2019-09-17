import React from 'react';
import articleContent from './article-content';
import ArticleList from '../components/ArticleList';

const ArticlesListPage = () => (
    <>
        <h1>List Articles</h1>
        <div style={{textAlign: "left", padding: 20 + "px" }}>
            <ArticleList articles={articleContent} />
        </div>
    </>
)

export default ArticlesListPage;
