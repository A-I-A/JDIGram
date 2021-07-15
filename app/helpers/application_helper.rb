module ApplicationHelper
  def svg(name)
    file_path = "#{Rails.root}/app/assets/images/#{name}.svg"
    return File.read(file_path).html_safe if File.exists?(file_path)
    '(not found)'
  end

  def user_profile_path?
    params[:controller] == 'users' && params[:action] == 'show'
  end

  def get_avatar_url(user)
    if user.avatar.attached?
      avatar = url_for(user.avatar)
    else 
      avatar = false
    end
  end

end
