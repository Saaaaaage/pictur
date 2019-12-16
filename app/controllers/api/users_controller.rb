class Api::UsersController < ApplicationController
    before_action :ensure_logged_in!, only: [:update, :destroy]

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 400
        end
    end

    def username_available?
        render json: !User.find_by(username: params[:username])
    end

    def show
        @user = User.find(params[:id])
    end

    def update
        @user = User.find(params[:id])
        if current_user.id == @user.id
            if @user.update(user_params)
                render :show
            else
                render json: @user.errors.full_messages, status: 400
            end
        else
            render json: ["Unauthorized"], status: 401
        end
    end

    def destroy
        @user = User.find(params[:id])
        if current_user.id == @user.id
            if @user.destroy
                render :show
            else
                render json: @user.errors.full_messages, status: 400
            end
        else
            render json: ["Unauthorized"], status: 401
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :username, :password, :phone_number)
    end
end
