

import { createContext, useState } from "react";

 const PostsContext = createContext();

export function PostsProvider({ children }) {

    const [posts, setPosts] = useState([])
    const [updatedPosts, setUpdatedPosts] = useState([])
    const [postsToUpdate, setPostsToUpdate] = useState(0)
    const [mustUpdatePosts, setMustUpdatePosts] = useState(false)
    const [sendPost, setSendPost] = useState(false)
    const [gotPosts, setGotPosts] = useState(false)

    return (
        <PostsContext.Provider
            value={{
                posts, setPosts,
                updatedPosts, setUpdatedPosts,
                postsToUpdate, setPostsToUpdate,
                mustUpdatePosts, setMustUpdatePosts,
                sendPost, setSendPost,
                gotPosts, setGotPosts
            }}
        >
            {children}
        </PostsContext.Provider>
    )
}

export default PostsContext