# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

category_data = [
  { name: 'Kitchenware' },
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Books' },
  { name: 'Sports Equipment' }
]

Category.create!(category_data)

product_data = [
  { name: 'Hotpot', description: 'Stainless steel hotpot for family gatherings.', price: '29.99', category_id: Category.find_by(name: 'Kitchenware').id, image: 'https://images.pexels.com/photos/211760/pexels-photo-211760.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Toaster', description: '4-slice toaster with adjustable settings.', price: '49.99', category_id: Category.find_by(name: 'Electronics').id, image: 'https://images.pexels.com/photos/327136/pexels-photo-327136.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'T-shirt', description: 'Comfortable cotton t-shirt in assorted colors.', price: '14.99', category_id: Category.find_by(name: 'Clothing').id, image: 'https://images.pexels.com/photos/563067/pexels-photo-563067.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Novel', description: 'Bestselling fiction novel by a renowned author.', price: '12.99', category_id: Category.find_by(name: 'Books').id, image: 'https://images.pexels.com/photos/563067/pexels-photo-563067.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Soccer Ball', description: 'Official size and weight soccer ball for practice and matches.', price: '19.99', category_id: Category.find_by(name: 'Sports Equipment').id, image: 'https://images.pexels.com/photos/211760/pexels-photo-211760.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Blender', description: 'High-powered blender for smoothies and shakes.', price: '79.99', category_id: Category.find_by(name: 'Kitchenware').id, image: 'https://images.pexels.com/photos/563067/pexels-photo-563067.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Headphones', description: 'Wireless headphones with noise-cancellation feature.', price: '99.99', category_id: Category.find_by(name: 'Electronics').id, image: 'https://images.pexels.com/photos/327136/pexels-photo-327136.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Jeans', description: 'Classic denim jeans for everyday wear.', price: '39.99', category_id: Category.find_by(name: 'Clothing').id, image: 'https://images.pexels.com/photos/563067/pexels-photo-563067.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Cookbook', description: 'Collection of recipes from around the world.', price: '24.99', category_id: Category.find_by(name: 'Books').id, image: 'https://images.pexels.com/photos/211760/pexels-photo-211760.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Yoga Mat', description: 'Eco-friendly yoga mat for yoga and exercise routines.', price: '29.99', category_id: Category.find_by(name: 'Sports Equipment').id, image: 'https://images.pexels.com/photos/327136/pexels-photo-327136.jpeg?auto=compress&cs=tinysrgb&w=600' }
]

Product.create!(product_data)
