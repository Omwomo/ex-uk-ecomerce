class Api::V1::OrdersController < ApplicationController
    # before_action :authenticate_user!, except: [:create]
    # load_and_authorize_resource
  
    # GET /orders
    def index
      @orders = current_order.includes(order_items: { product: {} }) # Include associated order items with products
      render json: @orders, include: [:order_items]
    end
  
    # GET /orders/:id
    def show
      @order = current_cart
      render json: @order
    end
  
    # POST /orders
    def create
      @order = current_order
      @order.user_id = current_user&.id

      if @order.save
        render json: @order, status: :created
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /orders/:id
    def update
      @order = current_order
      if @order.update(order_params)
        render json: @order
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /orders/:id
    def destroy
      @order = current_order
      @order.destroy
      head :no_content
    end
  
    private

    def current_order
      if user_signed_in?
        current_user.orders # Don't include order_items here as they are already included in the index action
      else
        User.create_guest_user.orders # Don't include order_items here as they are already included in the index action
      end
    end

    def guest_order
      Order.find_by(id: cookies.signed[:order_id])
    end
  
    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:status, :total_price)
    end
end
  