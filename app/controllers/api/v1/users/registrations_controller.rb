class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
    skip_before_action :verify_authenticity_token
    respond_to :json

    private

    def respond_with(resource, _opts = {})
        token = resource.generate_jwt
        if resource.persisted?
          render json: resource, status: :created
        else
          render json: resource.errors, status: :unprocessable_entity
        end
    end

    def respond_to_on_destroy
        head :no_content
    end
end
