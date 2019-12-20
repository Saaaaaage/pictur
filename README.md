# Pictur

## About
Pictur ([link](https://pictur-9000.herokuapp.com/#/ "link")) is a clone of the popular image hosting site Imgur ([link](https://imgur.com/ "link")).  Pictur is a place to share and discover great images from across the web.  It supports user auth, uploading, posting, tagging, and commenting.

## Architecture
Pictur is built on the PRRRR stack :smile_cat: (PostgreSQL, Ruby, Rails, React, Redux).  The backend runs on Rails with a SQL DB, while the frontend is a single page app running on React-Redux.

## Notable Features

#### Adding Tags

The add tag button is a basket of user-friendly functionality to make adding tags to posts fast and easy.  These functions include:
 * Convert the button to an input field on click
 * Shift focus to the input field to streamline user input
 * Automatically suggest popular tags in a dropdown
 * As a user types, shift suggestions to live tag search results already in the DB
 * If no existing tags are found, the only suggestion is what the user typed, allowing them to commit a new tag to the Post and the DB
 * On tag submission, re-open the add tag dialogue with cursor focus in the input field, so the user can keep adding tags without interruption
 * Automatically save changes if no new tags have been added for a brief moment.

Each feature individually is a small piece of functionality, but together they deliver a very nice user experience.

[![UX++](https://gfycat.com/infamouseminentalaskankleekai "UX++")](<iframe src='https://gfycat.com/ifr/InfamousEminentAlaskankleekai' frameborder='0' scrolling='no' allowfullscreen width='640' height='687'></iframe> "UX++")

#### User Auth

#### Splash Page Behavior

#### Comments

Delve deep into ~2 features that show off your technical abilities. Discuss both the challenges faced and your brilliant solutions.
Code snippets to highlight your best code (markdown code snippets, NOT screenshots)

## Installation
