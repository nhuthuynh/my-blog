import React, { useState, useEffect } from 'react';
import articleContent from './article-content';
import ArticleList from '../components/ArticleList';
import UpvotesSection from '../components/UpvotesSection';
import CommentsList from '../components/CommentsList';
import NotFoundPage from './NotFoundPage';

const ArticlePage = ({ match }) => {
    
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);
    const otherArticles = articleContent.filter(article => article.name !== name);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    // useEffect allow us to perform side effect inside functional component
    // run when componentDidMount, componentUpdate
    // first argument of useEffect function is function will be called when componentDidMount, componentUpdate
    // useEffect doesn't allow using async function for first function
    // second argument of useEffect function is an array list of values useEffect watching
    // whether they are changed useEffect will call the first argument function again

    useEffect(() => {
        (async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        })();
    }, [name]);

    if (!articleInfo) return (<NotFoundPage/>)
    return (
    <>
        <h1>{ article.title }</h1>
        <UpvotesSection upvotes={articleInfo.upvotes} articleName={name} setArticleInfo={setArticleInfo} />
        <div className="content">
            {
                article.content.map((paragraph, key) => (<p key={key}>{paragraph}</p>))
            }
        </div>
        <CommentsList comments={articleInfo.comments} />
        <div className="others" style={{ textAlign: "left", paddingLeft: 20 + "px"}}>
            <h3>Other articles</h3>
            <ArticleList articles={otherArticles} />
        </div>
    </>)
}

export default ArticlePage;
