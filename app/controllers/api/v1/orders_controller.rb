class Api::V1::OrdersController < ApplicationController
  # before_action :authenticate_user!, except: [:create]
  # load_and_authorize_resource

  # GET /orders
  def index
    @orders = current_user ? current_user.orders.includes(order_items: :product) : [current_order]
    render json: @orders, include: [:order_items => { include: :product }]
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
      current_user.orders.first_or_create(status: 'new')
    else
      guest_order || create_guest_order
    end
  end
  
  def guest_order
    Order.find_by(id: cookies.signed[:order_id])
  end
  
  def create_guest_order
    guest_user = User.create_guest_user
    order = guest_user.orders.create(status: 'new')
    cookies.signed[:order_id] = order.id
    order
  end

  # Only allow a trusted parameter "white list" through.
  def order_params
    params.require(:order).permit(:status, :total_price)
  end
end
