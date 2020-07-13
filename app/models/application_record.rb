class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  before_validation :remove_extra_whitespace
  before_validation :check_characters

  # Define an error message for unpermitted spaces.
  SPACES_NOT_ALLOWED = 'cannot contain spaces'

  # Define an error message for unpermitted characters.
  CHARS_NOT_ALLOWED = 'cannot contain the following characters:'

  # Remove beginning and trailing whitespace and replace consecutive spaces
  # with a single space.
  def remove_extra_whitespace
    attributes.each do |key, val|
      next unless val.present? && val.is_a?(String)

      self[key] = val.strip.squeeze(' ')
    end
  end

  # Check that the object contains only whitelisted characters.
  def check_characters
    attributes.each do |key, val|
      next unless val.present? && val.is_a?(String)

      invalid_chars = val.gsub(Regexp.new(Constants::CHAR_WHITELIST), '')
      next if invalid_chars.empty?

      uniq_invalid_chars = invalid_chars.split('').uniq.join
      error_msgs = []
      error_msgs << SPACES_NOT_ALLOWED if uniq_invalid_chars.match(/ /)
      uniq_invalid_chars.delete!(' ')
      if uniq_invalid_chars.present?
        error_msgs << "#{CHARS_NOT_ALLOWED} #{uniq_invalid_chars}"
      end
      error_msgs.each { |msg| errors.add(key, msg) }
    end
  end
end
