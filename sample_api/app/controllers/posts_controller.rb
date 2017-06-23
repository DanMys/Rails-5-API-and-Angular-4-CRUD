class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  def index
    @posts = Post.all
    render json: @posts
  end

  def show
    render json: @post
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end
end
