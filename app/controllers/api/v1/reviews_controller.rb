class Api::V1::ReviewsController < ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    load_and_authorize_resource
  
    # GET /reviews
    def index
      @reviews = Review.all
      render json: @reviews
    end
  
    # GET /reviews/:id
    def show
      @review = Review.find(params[:id])
      render json: @review
    end
  
    # POST /reviews
    def create
      @review = current_user.reviews.build(review_params)
      if @review.save
        render json: @review, status: :created
      else
        render json: @review.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /reviews/:id
    def update
      @review = Review.find(params[:id])
      if @review.update(review_params)
        render json: @review
      else
        render json: @review.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /reviews/:id
    def destroy
      @review = Review.find(params[:id])
      @review.destroy
      head :no_content
    end
  
    private
  
    # Only allow a trusted parameter "white list" through.
    def review_params
      params.require(:review).permit(:rating, :comment, :product_id)
    end
  end
  