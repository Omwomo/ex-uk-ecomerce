class ApplicationController < ActionController::Base
  include ActionController::MimeResponds
  include ActionController::Helpers
  include ActionController::Flash
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :null_session, if: -> { request.format.json? }
end
