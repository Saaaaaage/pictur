json.extract! comment, :id, :body, :post_id, :parent_id, :user_id, :created_at

# TODO: This is inefficient!!!  investigate using a counter_cache???
# https://codereview.stackexchange.com/questions/164695/count-has-many-relationships/169580
json.child_count comment.children.size