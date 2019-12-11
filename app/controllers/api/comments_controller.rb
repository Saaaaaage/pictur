class Api::CommentsController < ApplicationController
    def index
        @comments = Post.find(params[:post_id]).comments
    end

    def create
        @comment = Comment.new(comment_params)
        @comment.post_id = Post.find(:post_id).id
        @comment.user_id = current_user.id
        if @comment.save
            render :show
        else
            render json: @comment.errors.full_messages, status: 400
        end
    end

    def show
        @comment = Comment.find(params[:id])
    end

    def destroy
        @comment = Comment.find(params[:id])
        if current_user == @comment.user
            if @comment.destroy
                render :show
            else
                render json: @comment.errors.full_messages, status: 400
            end
        else
            render json: ["Unauthorized"], status: 401
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :parent_id)
    end
end
