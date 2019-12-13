# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ApplicationRecord
    validates :name, presence: true
    validates :name, uniqueness: true

    has_many :post_tags,
        class_name: "PostTag",
        primary_key: :id,
        foreign_key: :tag_id,
        inverse_of: :tag
    
    has_many :posts,
        through: :post_tags,
        source: :post
end
