class Message < ApplicationRecord
  def self.random_greeting
    order('RANDOM()').first&.greeting
  end
end
