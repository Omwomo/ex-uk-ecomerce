class Api::V1::CategoriesController < ApplicationController
    # before_action :authenticate_user!, except: [:index, :show]
    load_and_authorize_resource

    # GET /categories
    def index
        @categories = Category.all
        render json: @categories
    end

    # GET /categories/:id
    def show
        @category = Category.find(params[:id])
        render json: @category
    end

    # POST /categories
    def create
        @category = Category.new(category_params)
        if @category.save
        render json: @category, status: :created
        else
        render json: @category.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /categories/:id
    def update
        @category = Category.find(params[:id])
        if @category.update(category_params)
        render json: @category
        else
        render json: @category.errors, status: :unprocessable_entity
        end
    end

    # DELETE /categories/:id
    def destroy
        @category = Category.find(params[:id])
        @category.destroy
        head :no_content
    end

    private

    # Only allow a trusted parameter "white list" through.
    def category_params
        params.require(:category).permit(:name)
    end
end  
