module ControllerMacros
  def self.included(base)
    base.extend(ClassMethods)
  end

  module ClassMethods
    def it_gives_404_when_user_not_exits(*actions)
      actions.each do |action|
        it "#{action} renders 404 when user not exists" do
          process action, params: { id: 0 }
          expect(response.status).to eq(404)
        end
      end
    end
  end
end
