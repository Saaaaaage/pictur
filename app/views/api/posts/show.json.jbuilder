json.partial! "api/posts/post", post: @post
json.comments do
    @post.root_comments.each do |comment|
        json.root do
            json.set! comment.id do
                json.partial! "api/comments/comment", comment: comment
            end
        end
    end
end
json.tags do
    @post.tags.each do |tag|
        json.set! tag.id do
            json.extract! tag, :id, :name
        end
    end
end