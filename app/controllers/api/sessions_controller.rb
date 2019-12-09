class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if @user
            login!(@user)
            render 'api/users/show';
        else
            render json: ['Your login information was incorrect.'], status: 401
        end
    end

    def destroy
        if logged_in?
            logout!
            render json: {}
        else
            render json: ['Not found'], status: 404
        end
    end
end
