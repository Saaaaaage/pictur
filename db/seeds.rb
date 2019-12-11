# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# puts "Destroying users ..."
User.destroy_all

# puts 'Destroying uploads...'
# Post.all.each do |post|
#     post.uploads.purge
# end

# puts 'Destroying posts...'
# Post.destroy_all

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

# puts 'Creating posts and uploading images...'
# path = "/Users/sage/Desktop/public_domain_images"
# Dir.foreach(path) do |filename|
#     next unless ['jpg', 'jpeg'].include?(filename.split(".")[-1])
    
#     puts '...Creating a post...'
#     post = Post.create!({
#         user: pam,
#         title: filename.split(".")[0].split("-").map(&:capitalize).join(" ").tr("0-9", "")
#     })

#     puts "...Attaching an image: #{filename}"
#     post.uploads.attach(io: File.open(path + '/' + filename), filename: filename)

#     # break if Post.all.length > 6
# end
# puts 'Done!'