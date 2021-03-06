# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  phone_number    :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
    attr_reader :password

    validates :username, :email, :phone_number, :password_digest, :session_token, presence:true
    validates :username, :email, :phone_number, :session_token, uniqueness:true
    validates :password, length: {minimum: 6}, allow_nil: true

    before_validation :ensure_session_token

    has_many :posts, inverse_of: :user
    has_many :comments, inverse_of: :user

    ##################################
    ##### Session functions ##########
    ##################################

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def self.generate_session_token
        SecureRandom.urlsafe_base64(16)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save
        self.session_token
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    ######################################
    ##### End Session functions ##########
    ######################################

    def post_count
        self.posts.where(public:true).size
    end
end
