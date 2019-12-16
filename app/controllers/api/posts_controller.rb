class Api::PostsController < ApplicationController
    before_action :ensure_logged_in!, only: [:create, :update, :destroy]

    # TODO: pagination
    def index
        @posts = Post.with_attached_uploads.includes(:user).all
    end

    def show
        # TODO: Comment retrieval is super inefficient: fix it!
        @post = Post.with_attached_uploads.includes(:user).find(params[:id])
    end

    def create
        @post = Post.new(post_params)
        @post.user = current_user
        if @post.save
            render :show
        else
            render json: @post.errors.full_messages, status: 400
        end
    end

    def update
        @post = Post.find(params[:id])
        if current_user.id == @post.user.id
            if @post.update(post_params)
                render :show
            else
                render json: @post.errors.full_messages, status: 400
            end
        else
            render json: ["Unauthorized"], status: 401
        end
    end

    def destroy
        @post = Post.find(params[:id])
        if current_user.id == @post.user.id
            if (@post.uploads.purge and @post.destroy)
                render :show
            else
                render json: @post.errors.full_messages, status: 400
            end
        else
            render json: ["Unauthorized"], status: 401
        end
    end

    private

    def post_params
        params.require(:post).permit(:title, :public, uploads:[])
    end
end
