
=begin
    TODO:  Implement sort order for images attached to posts

    Posts need a sort order and there are a number of ways to do this:
      1 - Patch active storage to hold sort order
      2 - Create a join table to sit between the posts and the active storage table
            post_uploads could then store sort_order and description
      3 - Store an array of active record entries in the order they should appear
            t.integer :order, array:true, default: []
  
    I understand #2 very well, but do not understand the implications of #1 and #3.
=end

class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.integer :user_id, null:false
      t.string :title
      t.boolean :public, null:false, default: false

      t.timestamps
    end
    add_index :posts, :user_id
  end
end
