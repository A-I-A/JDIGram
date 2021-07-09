module ApplicationHelper
  def svg(name)
    file_path = "#{Rails.root}/app/assets/images/#{name}.svg"
    return File.read(file_path).html_safe if File.exists?(file_path)
    '(not found)'
  end

  def user_profile_path?
    params[:controller] == 'users' && params[:action] == 'show'
  end

  def form_authenticity_token
    session[:_csrf_token] ||= SecureRandom.base64(32)
  end

end
