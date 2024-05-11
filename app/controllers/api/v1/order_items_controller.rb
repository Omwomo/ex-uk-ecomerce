class Api::V1::OrderItemsController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :authenticate_user!

  # POST /order_items
  def create
    @order = current_order # Fetch or create the current order
  
    if user_signed_in?
      @order.user_id = current_user.id
    else
      guest_user = User.create_guest_user
      @order.user_id = guest_user.id
    end
  
    @order_item = @order.order_items.build(order_item_params)
  
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
      current_user.order || current_user.build_order
    else
      guest_order || User.create_guest_user.orders.build # Build a new order with associated order items
    end
  end

  def guest_order
    Order.find_by(id: cookies.signed[:order_id])
  end

  def order_item_params
    params.require(:order_item).permit(:product_id, :quantity, :subtotal_price)
  end
end
