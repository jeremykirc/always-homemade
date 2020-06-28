class User < ApplicationRecord
  has_one_attached :avatar
  has_many :recipes, dependent: :destroy

  validates :username, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true

  def full_name
    "#{first_name} #{last_name}"
  end
end
