class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new(role: :guest) # guest user (not logged in)

    if user.admin?
      can :manage, :all
    else
      can :read, :all # Allows reading all resources
      
      # CRUD permissions for orders and order items for all users
      can :manage, Order
      can :manage, OrderItem
    end
  end
end
