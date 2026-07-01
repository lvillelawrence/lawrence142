class ApplicationController < ActionController::Base
  include HomepagePayload

  before_action :assign_layout_shell_meta

  rescue_from ActiveRecord::RecordNotFound, :with => :render_404

  def render_404
    render :template => "static/404", :status => 404
  end

  private

  def assign_layout_shell_meta
    @layout_shell_meta = layout_shell_meta
  end
end
