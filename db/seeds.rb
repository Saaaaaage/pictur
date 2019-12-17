# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# TODO: Find a way to make this file play nice with Heroku

puts "Destroying post/tag relationships..."
PostTag.destroy_all

puts "Destroying tags..."
Tag.destroy_all

puts 'Destroying comments...'
Comment.destroy_all

puts 'Destroying uploads...'
Post.all.each do |post|
  post.uploads.purge
end

puts 'Destroying posts...'
Post.destroy_all

puts "Destroying users ..."
User.destroy_all

puts 'Resetting keys'
ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

puts 'Creating Pam'
pam = User.create!({
  username: "pam",
  password: "i<3jim",
  email: "pam@dunermifflin.biz",
  phone_number: "123 456 7890"
})

puts 'Creating posts and tags and uploading images...'
path = "/Users/appacademystudent/Desktop/public_domain_images"
posts = []
created_tags = []
illegal_tags = [
  'And', 'With', "The"
]
Dir.foreach(path) do |filename|
  next unless ['jpg', 'jpeg'].include?(filename.split(".")[-1])
  
  puts '...Creating a post...'
  words = filename.tr("0-9", "").split(".")[0].split("-").map(&:capitalize)

  puts 'Creating tags...'
  my_tags = []
  words.each do |name|
    if name.length > 2 and !illegal_tags.include?(name)
      my_tags.push( Tag.find_by(name: name) || Tag.create!({name: name}) ) if name.length > 2
    end
  end

  post = Post.create!({
      user: pam,
      title: words.join(" "),
      tags: my_tags,
      public: true
  })
  posts << post

  puts "...Attaching an image: #{filename}"
  post.uploads.attach(io: File.open(path + '/' + filename), filename: filename)

  # break if Post.all.length > 2
end

puts 'Creating root level comments...'
comments = []
posts.each do |post|
  if post.id
    3.times do
      quote = Faker::TvShows::VentureBros.quote
      puts "\t#{quote}"
      # debugger
      comment = Comment.create!({
        body: quote,
        post: post,
        user: pam
      })
      comments << comment
    end
  end
end

puts 'Creating child comments...'
(comments.length * 10).times do |i|
  quote = Faker::TvShows::VentureBros.quote
  parent = comments.sample
  puts "\t#{i}. #{quote}"
  comment = Comment.create!({
    body: quote,
    post_id: parent.post_id,
    user: pam,
    parent: parent
  })
  comments << comment
end


puts 'Done!'