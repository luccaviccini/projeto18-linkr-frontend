import editPost from "./editPost";

export default function handleKeyPress(event, post, description, setDescription, posts, setPosts, setEditPostMode) {
    if (event.key === 'Enter') {
        editPost(post, description, posts, setPosts, setEditPostMode)
    } else if (event.key === 'Escape') {
        setEditPostMode(false)
        setDescription(post.postDesc)
    }
}