# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  post_id    :integer          not null
#  parent_id  :integer
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord
    validates :user_id, :post_id, :body, presence:true

    after_initialize :ensure_post_id!

    belongs_to :user, inverse_of: :comments
    belongs_to :post, inverse_of: :comments
    has_many :children,
        class_name: "Comment",
        primary_key: :id,
        foreign_key: :parent_id
    belongs_to :parent,
        class_name: "Comment",
        primary_key: :id,
        foreign_key: :parent_id,
        optional: true
    
    private

    def ensure_post_id!
        self.post_id ||= self.parent.post_id if self.parent
    end

    def all_my_children
        fast_comments = Hash.new {|hash, key| hash[key] = []}

        self.children.includes(:user).each do |comment|
            fast_comments[comment.parent_id] << comment
        end

        fast_comments
    end
end
