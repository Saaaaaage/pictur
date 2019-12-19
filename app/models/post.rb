# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  title      :string
#  public     :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ApplicationRecord
    validates_presence_of :title, if: :public

    after_save :ensure_thumbnail!
    after_update :ensure_thumbnail!

    belongs_to :user, inverse_of: :posts
    has_many :comments, inverse_of: :post
    has_many_attached :uploads

    has_many :post_tags,
        class_name: "PostTag",
        primary_key: :id,
        foreign_key: :post_id,
        inverse_of: :post
    has_many :tags,
        through: :post_tags,
        source: :tag

    # TODO: either this doesn't work, or it takes a long time to process
    def ensure_thumbnail!
        # puts "ensuring thumbnail for post no. #{self.id}"
        thumbnail if self.uploads.attached?
    end

    def thumbnail
        self.uploads.first.variant(resize: "240x").processed if (self.uploads.first and self.uploads.first.variable?)
    end

    def root_comments
        self.comments.where(comments: {parent_id: nil})
    end

    # This gets all comments for a post organized by parent_id
    # def comments_by_parent
    #     fast_comments = Hash.new {|hash, key| hash[key] = []}

    #     self.comments.includes(:user).each do |comment|
    #         fast_comments[comment.parent_id] << comment
    #     end

    #     fast_comments
    # end
end
