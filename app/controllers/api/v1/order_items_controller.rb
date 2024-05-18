class Api::V1::OrderItemsController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :authenticate_user!

  # POST /order_items
  def create
    @order = current_order
  
    @order_item = @order.order_items.find_or_initialize_by(product_id: order_item_params[:product_id])
    @order_item.quantity ||= 0
    @order_item.quantity += order_item_params[:quantity].to_i
    @order_item.subtotal_price = @order_item.quantity * @order_item.product.price
  
    if @order_item.save
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
      render json: @order_item
    else
      render json: @order_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /order_items/:id
  def destroy
    @order_item = OrderItem.find(params[:id])
    @order_item.destroy
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

  def order_item_params
    params.require(:order_item).permit(:product_id, :quantity, :subtotal_price)
  end
end
