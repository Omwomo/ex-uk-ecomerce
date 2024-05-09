class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :reviews
  has_many :orders

  def build_order
    orders.build
  end

  def self.create_guest_user
    # Try to find an existing guest user
    user = User.find_by(email: 'guest@example.com')

    # If a guest user is found, return it
    return user if user

    # If no guest user is found, create a new one
    user = User.create(email: 'guest@example.com', firstname: 'Guest', lastname: 'User', password: 'guestpassword', role: 'guest')

    # Create an order for the guest user
    user.orders.create(status: nil, total_price: nil)

    # Return the newly created guest user
    user
  end
end
