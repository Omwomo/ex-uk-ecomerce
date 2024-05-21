class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new(role: :guest) # guest user (not logged in)
    
    if user.admin?
      can :manage, :all
    elsif user.user? || user.guest?
      can :read, :all
      can :create, Order
      can :update, Order, user_id: user.id
      can :manage, OrderItem, order: { user_id: user.id }
    end
  end
end
