# @comments.each do |comment|
#     json.set! comment.id do
#         json.partial! "api/comments/comment", comment: comment
#     end
# end

@comments.each do |comment|
    json.set! comment.parent_id do
        json.set! comment.id do
            json.partial! "api/comments/comment", comment: comment
        end
    end
end
