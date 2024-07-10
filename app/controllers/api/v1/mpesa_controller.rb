class Api::V1::MpesaController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:callback, :initiate_payment]

  def initiate_payment
    phone_number = params[:phone_number]
    amount = params[:amount]
    account_reference = params[:account_reference]
    transaction_description = params[:transaction_description]

    begin
      mpesa_service = MpesaService.new
      response = mpesa_service.initiate_payment(phone_number, amount, account_reference, transaction_description)
      render json: response
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end

  def callback
    result_code = params.dig('Body', 'stkCallback', 'ResultCode')
    checkout_id = params.dig('Body', 'stkCallback', 'CallbackMetadata', 'Item').find { |i| i['Name'] == 'CheckoutRequestID' }['Value']

    if result_code == 0
      # Payment was successful
      checkout = Checkout.find_by(mpesa_checkout_id: checkout_id)
      checkout.update(status: 'paid')
    end

    render json: { message: 'Success' }
  end
end
