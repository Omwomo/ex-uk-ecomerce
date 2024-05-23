class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!, except: [:create, :index, :show, :current]

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

  # GET /api/v1/current_user
  def current
    if current_user
      render json: current_user
    else
      render json: { error: 'No user logged in' }, status: :unauthorized
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)
    @user.role = User.admin.count == 0 ? 'admin' : 'user'

    if @user.save
      log_in(@user)
      render json: { user: @user, token: @user.generate_jwt }, status: :created
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

  def log_in(user)
    # Transfer guest cart items to the user if present
    guest_order = Order.find_by(id: cookies.signed[:guest_order_id])
    if guest_order
      guest_order.update(user_id: user.id)
      cookies.delete(:guest_order_id)
    end
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:email, :password, :firstname, :lastname)
  end
end
