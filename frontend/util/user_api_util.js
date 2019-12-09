export const registerUser = user => {
    return $.ajax({
        url: '/api/users',
        method: 'POST',
        data: { user }
    })
}

export const getUser = (userId) => {
    return $.ajax({
        url: `/api/users/${userId}`,
        method: 'GET'
    })
}

export const updateUser = user => {
    return $.ajax({
        url: '/api/users',
        method: 'PATCH',
        data: { user }
    })
}

export const deleteUser = () => {
    return $.ajax({
        url: '/api/users',
        method: 'DELETE'
    })
}