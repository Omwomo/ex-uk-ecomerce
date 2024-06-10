class Api::V1::ProductsController < ApplicationController
    # before_action :authenticate_user!, except: [:index, :show]
    # load_and_authorize_resource
  
    # GET /products
    def index
      if params[:category_id]
        @products = Category.includes(products: { image_attachment: :blob }).find(params[:category_id]).products
      else
        @products = Product.includes(image_attachment: :blob).all
      end
      render json: @products
    end
  
    # GET /products/:id
    def show
      @product = Product.includes(image_attachment: :blob).find(params[:id])
      render json: @product
    end
  
    # POST /products
    def create
      @product = Product.new(product_params)
      if @product.save
        render json: @product, status: :created
      else
        render json: @product.errors, status: :unprocessable_entity
      end
    end
 
    # PATCH/PUT /products/:id
    def update
      @product = Product.find(params[:id])
      if @product.update(product_params)
        render json: @product
      else
        render json: @product.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /products/:id
    def destroy
      @product = Product.find(params[:id])
      ActiveRecord::Base.transaction do
        order_items = OrderItem.where(product_id: @product.id)
        orders = order_items.map(&:order).uniq
        order_items.destroy_all
        orders.each(&:update_total_price)
      end
      @product.destroy
      head :no_content
    end
  
    private
  
    # Only allow a trusted parameter "white list" through.
    def product_params
      params.require(:product).permit(:name, :image, :description, :price, :category_id)
    end
  end
  