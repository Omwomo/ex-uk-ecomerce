class Api::V1::OrdersController < ApplicationController
  # before_action :authenticate_user!, except: [:create]
  load_and_authorize_resource

  # GET /orders
  def index
    @orders = current_user ? current_user.orders.includes(order_items: { product: { image_attachment: :blob } }) : [current_order]
    render json: @orders, each_serializer: OrderSerializer, include: '**'
  end
  # GET /orders/:id
  def show
    @order = current_order.includes(order_items: { product: { image_attachment: :blob } }).find(params[:id])
    render json: @order, include: { order_items: { include: :product } }
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
      order = current_user.orders.includes(order_items: :product).find_or_create_by(status: 'new')
      transfer_guest_order_to_user(order) if cookies.signed[:guest_order_id].present?
      order
    else
      guest_order || create_guest_order
    end
  end

  def guest_order
    Order.includes(order_items: :product).find_by(id: cookies.signed[:guest_order_id])
  end

  def create_guest_order
    guest_user = User.create_guest_user
    order = guest_user.orders.create(status: 'new')
    cookies.signed[:guest_order_id] = { value: order.id, expires: 1.year.from_now }
    order
  end

  def transfer_guest_order_to_user(user_order)
    guest_order = Order.find_by(id: cookies.signed[:guest_order_id])
    if guest_order
      guest_order.order_items.update_all(order_id: user_order.id)
      guest_order.destroy
      # cookies.delete(:guest_order_id)
    end
  end

  # Only allow a trusted parameter "white list" through.
  def order_params
    params.require(:order).permit(:status, :total_price)
  end
end
