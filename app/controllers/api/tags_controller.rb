class Api::TagsController < ApplicationController
    def index
        # @tags = Tag.all
        @tags = Tag.all.joins(:posts).where(posts: {public: true}).select('tags.*, count(*) as post_count').group('tags.id').order('post_count desc')
    end

    def show
        @tag = Tag.all.joins(:posts).where(posts: {public: true}).select('tags.*, count(*) as post_count').group('tags.id').find(params[:id])
    end

    def find_tags
        if params[:query] and params[:query].length >= 2
            @tags = Tag.search(params[:query])
        else
            @tags = Tag.all.joins(:posts).where(posts: {public: true}).select('tags.*, count(*) as post_count').group('tags.id').order('post_count desc').limit(5)
        end
        render :index
    end

    def find_or_create
        @tag = Tag.find_or_create_by(name: params[:query].split(" ").map(&:capitalize).join(" "))
        render :no_count
    end
end
