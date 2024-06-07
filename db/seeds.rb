# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'open-uri'

# Clear existing data
Product.destroy_all
Category.destroy_all

# Seed categories
category_data = [
  { name: 'Kitchenware' },
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Books' },
  { name: 'Sports Equipment' }
]

categories = Category.create!(category_data)

# Seed products
product_data = [
  { name: 'Hotpot', inventory: 5, description: 'Stainless steel hotpot for family gatherings.', price: '29.99', category: categories.find { |c| c.name == 'Kitchenware' }, image_url: 'https://images.pexels.com/photos/211760/pexels-photo-211760.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Toaster', inventory: 5, description: '4-slice toaster with adjustable settings.', price: '49.99', category: categories.find { |c| c.name == 'Electronics' }, image_url: 'https://images.pexels.com/photos/327136/pexels-photo-327136.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'T-shirt', inventory: 5, description: 'Comfortable cotton t-shirt in assorted colors.', price: '14.99', category: categories.find { |c| c.name == 'Clothing' }, image_url: 'https://images.pexels.com/photos/563067/pexels-photo-563067.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Novel', inventory: 4, description: 'Bestselling fiction novel by a renowned author.', price: '12.99', category: categories.find { |c| c.name == 'Books' }, image_url: 'https://images.pexels.com/photos/563067/pexels-photo-563067.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Soccer Ball', inventory: 7, description: 'Official size and weight soccer ball for practice and matches.', price: '19.99', category: categories.find { |c| c.name == 'Sports Equipment' }, image_url: 'https://images.pexels.com/photos/211760/pexels-photo-211760.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Blender', inventory: 8, description: 'High-powered blender for smoothies and shakes.', price: '79.99', category: categories.find { |c| c.name == 'Kitchenware' }, image_url: 'https://images.pexels.com/photos/563067/pexels-photo-563067.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Headphones', inventory: 2, description: 'Wireless headphones with noise-cancellation feature.', price: '99.99', category: categories.find { |c| c.name == 'Electronics' }, image_url: 'https://images.pexels.com/photos/327136/pexels-photo-327136.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Jeans', inventory: 3, description: 'Classic denim jeans for everyday wear.', price: '39.99', category: categories.find { |c| c.name == 'Clothing' }, image_url: 'https://images.pexels.com/photos/563067/pexels-photo-563067.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Cookbook', inventory: 5, description: 'Collection of recipes from around the world.', price: '24.99', category: categories.find { |c| c.name == 'Books' }, image_url: 'https://images.pexels.com/photos/211760/pexels-photo-211760.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Yoga Mat', inventory: 5, description: 'Eco-friendly yoga mat for yoga and exercise routines.', price: '29.99', category: categories.find { |c| c.name == 'Sports Equipment' }, image_url: 'https://images.pexels.com/photos/327136/pexels-photo-327136.jpeg?auto=compress&cs=tinysrgb&w=600' }
]

product_data.each do |data|
  product = Product.create!(
    name: data[:name],
    description: data[:description],
    price: data[:price],
    category: data[:category],
    inventory: data[:inventory]
  )
  product.image.attach(io: URI.open(data[:image_url]), filename: "#{data[:name].parameterize}.jpg")
end