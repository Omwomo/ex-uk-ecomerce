class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # Guest user
    if user.admin?
      can :manage, Product
    else
      cannot :manage, Product
    end
  end
end
