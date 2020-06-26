include Rails.application.routes.url_helpers

class Recipe < ApplicationRecord
  has_one_attached :image
  
  def image_url
    return unless image.attached?

    url_for(image)
  end
end
