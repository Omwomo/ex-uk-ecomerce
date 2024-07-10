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

   # POST /api/v1/checkouts
   def create
    @checkout = Checkout.new(checkout_params)

    if @checkout.save
      if @checkout.payment_method == 'MPESA'
        mpesa_service = MpesaService.new
        response = mpesa_service.initiate_payment(@checkout.customer_contact, @checkout.total_amount, @checkout.id, 'Order Payment')
        @checkout.update(mpesa_checkout_id: response['CheckoutRequestID']) if response['ResponseCode'] == '0'
      end

      render json: @checkout, status: :created
    else
      render json: @checkout.errors, status: :unprocessable_entity
    end
  end

  private

  def checkout_params
    params.require(:checkout).permit(:customer_address, :customer_contact, :payment_method, :total_amount, :status, :order_id, user_id)
  end
end
