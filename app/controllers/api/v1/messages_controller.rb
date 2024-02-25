class Api::V1::MessagesController < ApplicationController
  def index
    render json: { greeting: Message.random_greeting }, status: :ok
  end
end
