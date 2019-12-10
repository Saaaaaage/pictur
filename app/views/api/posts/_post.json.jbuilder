json.extract! post, :id, :title, :created_at, :user_id
json.thumbnail url_for(post.thumbnail)
json.uploads do
    post.uploads.each do |upload|
        json.set! upload.id do
            json.id upload.id
            json.url url_for(upload)
        end
    end
end