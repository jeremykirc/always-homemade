# frozen_string_literal: true

require 'constants'

# Load config depending on environment.
seed_file = Rails.env.production? ? 'seeds-prod.yml' : 'seeds-dev.yml'
config = YAML.load_file(Rails.root.join("config/#{seed_file}"))

# Loop through the config keys to create database records.
config.keys.each do |model_name|
  next if config[model_name].blank?

  config[model_name].each_key do |instance|
    begin
      model = model_name.singularize.camelize.constantize
      object = model.create!(config[model_name][instance])
    rescue ActiveRecord::RecordInvalid => e
      next if e.message.include?('has already been taken')

      e.raise
    end
  end
end
