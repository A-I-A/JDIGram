module ApplicationHelper
  def svg(name)
    file_path = "#{Rails.root}/app/assets/images/#{name}.svg"
    return File.read(file_path).html_safe if File.exist?(file_path)

    '(not found)'
  end

  def user_profile_path?
    params[:controller] == 'users' && params[:action] == 'show'
  end

  def get_avatar_url(user)
    avatar = if user.avatar.attached?
               url_for(user.avatar)
             else
               false
             end
  end
end
