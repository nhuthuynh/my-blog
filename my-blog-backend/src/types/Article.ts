export default interface Article {
    _id: String
    name: String
    title: String
    content: String
    upvotes: Number
    comments: Array<Comment>
}