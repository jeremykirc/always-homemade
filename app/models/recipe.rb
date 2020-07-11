include Rails.application.routes.url_helpers

class Recipe < ApplicationRecord
  belongs_to :user
  alias :author :user
  has_one_attached :image

  # Return the url for the attached image, if any.
  def image_url
    return unless image.attached?

    url_for(image)
  end
end
