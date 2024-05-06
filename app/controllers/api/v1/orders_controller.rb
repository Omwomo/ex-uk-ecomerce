class Api::V1::OrdersController < ApplicationController
    # before_action :authenticate_user!
    load_and_authorize_resource
  
    # GET /orders
    def index
      @orders = current_user.orders
      render json: @orders
    end
  
    # GET /orders/:id
    def show
      @order = current_user.orders.find(params[:id])
      render json: @order
    end
  
    # POST /orders
    def create
      @order = current_user.orders.build(order_params)
      if @order.save
        render json: @order, status: :created
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /orders/:id
    def update
      @order = current_user.orders.find(params[:id])
      if @order.update(order_params)
        render json: @order
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /orders/:id
    def destroy
      @order = current_user.orders.find(params[:id])
      @order.destroy
      head :no_content
    end
  
    private
  
    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:status, :total_price)
    end
  end  
