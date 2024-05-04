class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # Guest user
    can :manage, :all if user.admin?
    can :access, :admin_panel if user.admin?
  end
end
