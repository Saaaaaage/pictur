# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# TODO: Find a way to make this file play nice with Heroku

# puts "Destroying post/tag relationships..."
PostTag.destroy_all

# puts "Destroying tags..."
Tag.destroy_all

# puts 'Destroying comments...'
Comment.destroy_all

# puts 'Destroying uploads...'
Post.all.each do |post|
  post.uploads.purge
end

# puts 'Destroying posts...'
Post.destroy_all

# puts "Destroying users ..."
User.destroy_all

# puts 'Resetting keys'
ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

# puts 'Creating Pam'
pam = User.create!({
  username: "pam",
  password: "i<3jim",
  email: "pam@dunermifflin.biz",
  phone_number: "123 456 7890"
})

# puts 'Creating tags...'
tag_names = [
  'Stock Photo',
  'Oddly Satisfying',
  'Recipes',
  'Aww',
  'Memes',
  'Gaming',
  'The Great Outdoors',
  'Funny',
  'Anime',
  'Comics',
  'Virtual Reality',
  'Kittens',
  'Chocolate',
  'Deal With It',
  'Awesome',
  'Eat What You Want',
  'Doug',
  'Avocado',
  'Wallpaper',
  'Otter',
  'Owl',
  'Neat',
  'Dogs Are The Best People',
  'Movies And Tv',
  'Fail',
  'Thats So Pam',
  'Like A Boss',
  'Squad',
  'Life Goal',
  'Potato',
  'Banana',
]
tags = []
tag_names.each do |name|
  tag = Tag.create!({name: name})
  tags << tag
end

# puts 'Creating posts and uploading images...'
# path = "/Users/sage/Desktop/public_domain_images"
# posts = []
# Dir.foreach(path) do |filename|
#   next unless ['jpg', 'jpeg'].include?(filename.split(".")[-1])
  
#   puts '...Creating a post...'
#   post = Post.create!({
#       user: pam,
#       title: filename.split(".")[0].split("-").map(&:capitalize).join(" ").tr("0-9", ""),
#       tags: tags.sample(3)
#   })
#   posts << post

#   puts "...Attaching an image: #{filename}"
#   post.uploads.attach(io: File.open(path + '/' + filename), filename: filename)

#   # break if Post.all.length > 2
# end

# puts 'Creating root level comments...'
# comments = []
# posts.each do |post|
#   3.times do
#     quote = Faker::TvShows::VentureBros.quote
#     puts "\t#{quote}"
#     comment = Comment.create!({
#       body: quote,
#       post: post,
#       user: pam
#     })
#     comments << comment
#   end
# end

# puts 'Creating child comments...'
# (comments.length * 10).times do |i|
#   quote = Faker::TvShows::VentureBros.quote
#   parent = comments.sample
#   puts "\t#{i}. #{quote}"
#   comment = Comment.create!({
#     body: quote,
#     post_id: parent.post_id,
#     user: pam,
#     parent: parent
#   })
#   comments << comment
# end


# puts 'Done!'