# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Post.destroy_all

pam = User.create!({
    username: "pam",
    password: "i<3jim",
    email: "pam@dunermifflin.biz",
    phone_number: "123 456 7890"
})
post = Post.create!({
    user: pam,
    title: "My pupper"
})
post.uploads.attach(io: File.open("/Users/sage/Desktop/public_domain_images/dog-wearing-green-fur-coat-2951921.jpg"), filename: "dog-wearing-green-fur-coat-2951921.jpg")