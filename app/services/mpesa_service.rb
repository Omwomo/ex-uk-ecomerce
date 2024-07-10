require 'http'

class MpesaService
  MPESA_BASE_URL = "https://sandbox.safaricom.co.ke"
  CONSUMER_KEY = "QeiGTGwAaO9qaDwYerKrwAv5ivQmik4LmY4XbZYONaUAuQAG"
  CONSUMER_SECRET = "YwZ8jVMayBwwKOy6K1YC3ohRa9GBdjRbNuklodCw4OlvSlFYP21yOFBBtj8NtKxcS"
  SHORTCODE = "174379"
  PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
  MPESA_BUYGOODS_ACCOUNT = "5785623"

  def initialize
    @token = generate_token
  end

  def generate_token
    response = HTTP.basic_auth(user: CONSUMER_KEY, pass: CONSUMER_SECRET)
                   .headers(accept: 'application/json')
                   .get("#{MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials")
  
    if response.status.success?
      response.parse['access_token']
    else
      raise "Failed to generate token: #{response.status} - #{response.body.to_s}"
    end
  end

  def initiate_payment(phone_number, amount, account_reference, transaction_description)
    timestamp = Time.now.strftime("%Y%m%d%H%M%S")
    password = Base64.strict_encode64("#{SHORTCODE}#{PASSKEY}#{timestamp}")
  
    payload = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerBuyGoodsOnline",
      Amount: amount,
      PartyA: phone_number,
      PartyB: "600000",
      PhoneNumber: phone_number,
      CallBackURL: "https://yourdomain.com/api/v1/mpesa/callback",
      AccountReference: account_reference,
      TransactionDesc: transaction_description
    }
  
    response = HTTP.auth("Bearer #{@token}")
                   .headers(content_type: 'application/json')
                   .post("#{MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest", json: payload)
  
    if response.status.success?
      response.parse
    else
      raise "Failed to initiate payment: #{response.status} - #{response.body.to_s}"
    end
  end  
end