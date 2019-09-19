export default interface Article {
    _id: string
    name: string
    upvotes: number
    comments: Array<Comment>
}