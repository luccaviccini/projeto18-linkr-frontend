import axios from "axios"

export default async function editPost(post, description, posts, setPosts, setEditPostMode) {
    const token = localStorage.getItem('token')
    if(!token) return  
    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/posts/${post.postId}`, {
            description
        }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        let indexToUpdate
        const postsCopy = [...posts]
        const updatedPost = posts.find((post_, index) => {
            if(post_.postId === post.postId) {
                indexToUpdate = index
                return true
            }
            return false
        })
        updatedPost.postDesc = description.trim()
        postsCopy[indexToUpdate] = updatedPost
        setPosts(postsCopy)
        setEditPostMode(false)
    } catch (error) {
        console.error(error)
        alert("Não foi possível editar o post!")
    }
}