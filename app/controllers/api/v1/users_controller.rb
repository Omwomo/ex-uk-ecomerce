class Api::V1::UsersController < ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    load_and_authorize_resource
  
    # GET /users
    def index
      @users = User.all
      render json: @users
    end
  
    # GET /users/:id
    def show
      @user = User.find(params[:id])
      render json: @user
    end
  
    # POST /users
    def create
      @user = User.new(user_params)
      if @user.save
        render json: @user, status: :created
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /users/:id
    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /users/:id
    def destroy
      @user = User.find(params[:id])
      @user.destroy
      head :no_content
    end
  
    private
  
    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:email, :password, :role, :firstname, :lastname)
    end
  end
  