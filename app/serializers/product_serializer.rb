class ProductSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :description, :price, :category_id, :image_url

  def image_url
    object.image.attached? ? rails_blob_url(object.image, host: 'localhost', port: 3000) : nil
  end
end
