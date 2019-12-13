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

require 'test_helper'

class PostTagTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
