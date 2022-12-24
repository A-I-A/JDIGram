# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  def after_sign_in_path_for(*)
    publications_path
  end

  def after_sign_out_path_for(*)
    new_user_session_path
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[login name])
  end

  private

  def render_404
    render file: Rails.root.join('public/404.html'), status: :not_found
  end

  def render_403
    render file: Rails.root.join('public/403.html'), status: :forbidden
  end
end
