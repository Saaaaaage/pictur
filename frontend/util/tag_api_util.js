export const fatchTags = () => {
    return $.ajax({
        url: '/api/tags',
        method: "GET"
    })
}