class Api::V1::OrderItemsController < ApplicationController
  before_action :authenticate_user!, except: [:create]
  load_and_authorize_resource

  # POST /order_items
  def create
    @order_item = OrderItem.new(order_item_params)
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

  # Only allow a trusted parameter "white list" through.
  def order_item_params
    params.require(:order_item).permit(:order_id, :product_id, :quantity, :subtotal_price)
  end
end
 
