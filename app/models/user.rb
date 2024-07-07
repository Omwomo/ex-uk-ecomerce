class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :reviews
  has_many :orders
  has_many :checkouts

  def build_order
    orders.build
  end

  # Define the generate_jwt method
  def generate_jwt
    secret_key = Rails.application.credentials.dig(Rails.env.to_sym, :secret_key_base)
    JWT.encode({ id: id, exp: 60.days.from_now.to_i }, secret_key)
  end

  enum role: { guest: 0, user: 1, admin: 2 }

  after_initialize :set_default_role, if: :new_record?

  def set_default_role
    self.role ||= :user
  end

  def self.create_guest_user
    unique_email = "guest_#{SecureRandom.hex(10)}@example.com"
    user = User.create!(
      email: unique_email,
      firstname: 'Guest',
      lastname: 'User',
      password: SecureRandom.hex(10),
      role: 'guest'
    )
    user.orders.create!(status: 'new', total_price: 0.0)
    user
  end
end
