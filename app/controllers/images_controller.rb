class ImagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
  end

  def upload
  end
end
