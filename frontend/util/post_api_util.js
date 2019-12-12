export const getPosts = () => {
    return $.ajax({
        url: `/api/posts/`,
        method: 'GET'
    })
}

export const getPost = postId => {
    return $.ajax({
        url: `/api/posts/${postId}`,
        method: 'GET'
    })
}

export const createPost = post => {
    return $.ajax({
        url: '/api/posts',
        method: 'POST',
        data: post,
        contentType: false,
        processData: false
    }) // data might not need to be an object
}

export const updatePost = post => {
    return $.ajax({
        url: '/api/posts',
        method: 'PATCH',
        data: { post }
    })
}

export const deletePost = postId => {
    return $.ajax({
        url: `/api/posts/${postId}`,
        method: 'DELETE'
    })
}