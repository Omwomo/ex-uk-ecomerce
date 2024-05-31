class Api::V1::OrderItemsController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :authenticate_user!
  load_and_authorize_resource

  # POST /order_items
  def create
    @order = current_order
  
    @order_item = @order.order_items.find_or_initialize_by(product_id: order_item_params[:product_id])
    @order_item.quantity ||= 0
    @order_item.quantity += order_item_params[:quantity].to_i
    @order_item.subtotal_price = @order_item.quantity * @order_item.product.price
  
    if @order_item.save
      @order.update_total_price
      @order.save
      render json: @order_item, status: :created
    else
      render json: @order_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /order_items/:id
  def update
    @order_item = OrderItem.find(params[:id])
    if @order_item.update(order_item_params)
      @order_item.subtotal_price = @order_item.quantity * @order_item.product.price
      @order_item.save
      @order_item.order.update_total_price
      @order_item.order.save
      render json: @order_item
    else
      render json: @order_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /order_items/:id
  def destroy
    @order_item = OrderItem.find(params[:id])
    order = @order_item.order
    @order_item.destroy
    order.update_total_price
    order.save
    head :no_content
  end

  private

  def current_order
    if user_signed_in?
      order = current_user.orders.find_or_create_by(status: 'new')
      transfer_guest_order_to_user(order) if cookies.signed[:guest_order_id].present?
      order
    else
      guest_order || create_guest_order
    end
  end

  def guest_order
    Order.find_by(id: cookies.signed[:guest_order_id])
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

  def order_item_params
    params.require(:order_item).permit(:product_id, :quantity, :subtotal_price)
  end
end
