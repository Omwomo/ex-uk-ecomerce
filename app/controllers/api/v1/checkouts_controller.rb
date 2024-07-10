class Api::V1::CheckoutsController < ApplicationController
  # GET /api/v1/users/:user_id/checkouts
  def index
    if params[:user_id]
      @user = User.find(params[:user_id])
      @checkouts = @user.checkouts
    else
      @checkouts = Checkout.all
    end
    render json: @checkouts
  end

  # GET /api/v1/checkouts/:id
  def show
    @checkout = Checkout.find(params[:id])
    render json: @checkout
  end

   

  private

  def checkout_params
    params.require(:checkout).permit(:customer_address, :customer_contact, :payment_method, :total_amount, :status, :order_id, user_id)
  end
end
