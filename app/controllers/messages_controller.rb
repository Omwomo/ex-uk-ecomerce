class MessagesController < ApplicationController
  def index
    render json: { greeting: Message.random_greeting }
  end
end
