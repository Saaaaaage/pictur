export const getPosts = () => {
    return $.ajax({
        url: `/api/posts/`,
        method: 'GET'
    });
};

export const getPostsByTag = tagId => {
    return $.ajax({
        url: `/api/tags/${tagId}/posts`,
        method: 'GET'
    });
};

export const getPostsByUser = userId => {
    return $.ajax({
        url: `/api/users/${userId}/posts`,
        method: 'GET'
    });
};

export const getPost = postId => {
    return $.ajax({
        url: `/api/posts/${postId}`,
        method: 'GET'
    });
};

// post is FormData object
export const createPost = post => {
    return $.ajax({
        url: '/api/posts',
        method: 'POST',
        data: post,
        contentType: false,
        processData: false
    });
};

// post is FormData object
export const updatePostUploads = post => {
    return $.ajax({
        url: `/api/posts/${post.get('post[id]')}`,
        method: 'PATCH',
        data: post,
        contentType: false,
        processData: false
    });
};

export const updatePostAttributes = post => {
    return $.ajax({
        url: `/api/posts/${post.id}`,
        method: 'PATCH',
        data: {post}
    });
};

export const deletePost = postId => {
    return $.ajax({
        url: `/api/posts/${postId}`,
        method: 'DELETE'
    });
};