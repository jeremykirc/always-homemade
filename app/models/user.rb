class User < ApplicationRecord
  has_secure_password

  has_one_attached :avatar
  has_many :recipes, dependent: :destroy

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :first_name, presence: true
  validates :last_name, presence: true

  validates_format_of :email, with: URI::MailTo::EMAIL_REGEXP

  before_save { email.downcase! }

  # Return the users full name.
  def full_name
    "#{first_name} #{last_name}"
  end
end
