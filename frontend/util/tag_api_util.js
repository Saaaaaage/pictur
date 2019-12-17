export const fetchTags = () => {
    return $.ajax({
        url: '/api/tags',
        method: "GET"
    });
};

export const fetchTag = tagId => {
    return $.ajax({
        url: `/api/tags/${tagId}`,
        method: "GET"
    });
};

export const findTags = query => {
    return $.ajax({
        url: `/api/findTags?query=${query}`,
        method: 'GET'
    });
};