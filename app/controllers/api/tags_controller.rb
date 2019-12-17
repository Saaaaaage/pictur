class Api::TagsController < ApplicationController
    def index
        # @tags = Tag.all
        @tags = Tag.all.joins(:posts).where(posts: {public: true}).select('tags.*, count(*) as post_count').group('tags.id').order('post_count')
    end

    def show
        @tag = Tag.all.joins(:posts).where(posts: {public: true}).select('tags.*, count(*) as post_count').group('tags.id').find(params[:id])
    end
end
