class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?, :ensure_logged_in!

  def login!(user)
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
    @current_user
  end

  def logged_in?
    !!current_user
  end

  def ensure_logged_in!
    unless logged_in?
      render json: ['You gotta log in for that'], status: 401
    end
  end

end
