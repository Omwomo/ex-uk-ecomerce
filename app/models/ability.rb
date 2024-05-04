class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # Guest user
    can :read, :all # Allow all users to read everything

    if user.admin?
      can :manage, :admin_panel # Allow admins to access the admin panel
      can :manage, Product # Allow admins to manage products
      can :manage, Inventory # Allow admins to manage inventories
    end
  end
end
