# == Schema Information
#
# Table name: post_tags
#
#  id         :bigint           not null, primary key
#  post_id    :integer
#  tag_id     :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

# TODO: counter_cache won't actually work until we add a new column to the DB to track counts
# https://blog.appsignal.com/2018/06/19/activerecords-counter-cache.html
class PostTag < ApplicationRecord
    validates :post_id, uniqueness: { scope: :tag_id }
    
    belongs_to :tag,
        counter_cache: true
    belongs_to :post
end
