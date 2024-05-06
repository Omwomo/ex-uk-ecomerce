class Api::V1::OrdersController < ApplicationController
    # before_action :authenticate_user!, except: [:create]
    load_and_authorize_resource
  
    # GET /orders
    def index
      @orders = current_user.orders if user_signed_in?
      render json: @orders
    end
  
    # GET /orders/:id
    def show
      @order = current_user.orders.find(params[:id]) if user_signed_in?
      render json: @order
    end
  
    # POST /orders
    def create
      if user_signed_in?
        @order = current_user.orders.build(order_params)
      else
        # Create a guest user or anonymous user
        guest_user = User.create_guest_user
        @order = guest_user.orders.build(order_params)
      end
  
      if @order.save
        render json: @order, status: :created
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /orders/:id
    def update
      @order = current_user.orders.find(params[:id]) if user_signed_in?
      if @order.update(order_params)
        render json: @order
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /orders/:id
    def destroy
      @order = current_user.orders.find(params[:id]) if user_signed_in?
      @order.destroy
      head :no_content
    end
  
    private
  
    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:status, :total_price)
    end
  end
  