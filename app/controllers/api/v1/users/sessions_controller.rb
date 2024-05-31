class Api::V1::Users::SessionsController < Devise::SessionsController
    skip_before_action :verify_authenticity_token
    respond_to :json
  
    private
  
    def respond_with(resource, _opts = {})
      token = resource.generate_jwt
      render json: { user: resource, token: token }, status: :ok
    end
  
    def respond_to_on_destroy
      head :no_content
    end
end
  