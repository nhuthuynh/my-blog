import { ARTICLE_COMMENT, ARTICLE_CREATE, ARTICLE_UPVOTE, ARTICLE_RETRIEVE, ARTICLE_GET } from '../constants/actionTypes';

const initialState = {
    articles: [],
    otherArticles: [],
    article: { id: 0, name: '', title: '', content: '', comment: [], upvotes: 0 }
}

const retrieve = (articleRetrieve) => ({
    type: ARTICLE_RETRIEVE,
    payload: articleRetrieve
})

const get = (article) => ({
    type: ARTICLE_GET,
    payload: article
})

const upvote = (articleUpvote) => ({
    type: ARTICLE_UPVOTE,
    payload: articleUpvote
})

const create = (article) => ({
    type: ARTICLE_CREATE,
    payload: article
})

const comment = (articleComment) => ({
    type: ARTICLE_COMMENT,
    payload: articleComment
})

const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case ARTICLE_CREATE:
            break;
        case ARTICLE_GET:
            break;
        case ARTICLE_RETRIEVE:
            break;
        case ARTICLE_UPVOTE:
            break;
        case ARTICLE_COMMENT:
            break;
        default:
            return initialState;
    }
}

export { reducer, load, upvote, create, comment}


