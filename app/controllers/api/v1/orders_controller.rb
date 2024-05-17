class Api::V1::OrdersController < ApplicationController
  # before_action :authenticate_user!, except: [:create]
  # load_and_authorize_resource

  # GET /orders
  def index
    @orders = current_order.includes(order_items: :product) # Include associated order items with products
    render json: @orders, include: [:order_items]
  end

  # GET /orders/:id
  def show
    @order = current_order.find(params[:id])
    render json: @order
  end

  # POST /orders
  def create
    @order = current_order.build
    @order.user_id = current_user&.id

    if @order.save
      render json: @order, status: :created
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/:id
  def update
    @order = current_order.find(params[:id])
    if @order.update(order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/:id
  def destroy
    @order = current_order.find(params[:id])
    @order.destroy
    head :no_content
  end

  private

  def current_order
    if user_signed_in?
      current_user.orders # ActiveRecord relation
    else
      guest_order || create_guest_order
    end
  end

  def guest_order
    Order.where(id: cookies.signed[:order_id])
  end

  def create_guest_order
    guest_user = User.create_guest_user
    order = guest_user.orders.create(status: 'new')
    cookies.signed[:order_id] = order.id
    Order.where(id: order.id)
  end

  # Only allow a trusted parameter "white list" through.
  def order_params
    params.require(:order).permit(:status, :total_price)
  end
end
