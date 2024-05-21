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
