class UsersController < ApplicationController
  include Rails.application.routes.url_helpers

  before_action :set_user, only: [:show, :update]

  def index
    users = User.all.order(created_at: :desc)
    render json: users
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: user.errors
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors
    end
  end

  def show
    user_data = @user.posts.group(:name).sum(:number)
    posts = @user.posts.order(created_at: :desc).as_json(include: [:user, :likes_users])
    likes_posts = @user.likes_posts.order(created_at: :desc).as_json(include: [:user, :likes_users])
    render json: {
      user: @user, 
      user_data: user_data,
      posts: posts,
      likes_posts: likes_posts
    }
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :uid, :introduction)
  end

  def set_user
    @user = User.find_by(uid: params[:id])
  end

end


