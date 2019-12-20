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

#### User Auth

User authentication is a fully in-house auth solution.  From user creation, to sessions, to password security, all functions were built from the ground up to address the needs of the project.

#### Splash Page Behavior

###### Resizing

Pictur's splash page displays a series of columns each continaing a stack of images.  However, a fixed number of columns could look terrible if viewed on screens larger or smaller than the one used to develop the site.  To address this, the splash page adds an event listener to the window to fetch and track the size of the window.  This datum is used to determine the number of columns to display before, finally, the React component distributes the splash page's post previews evenly into the allocated columns.

###### Parallax Scrolling

As you scroll down on the splash page, a scroll event listener on the page calculates a new position to assign to the splash page banner in order to give the impression of parallax scrolling.  The banner moves upward faster than other assets on the page until it reaches a threshold to trigger different behavior, at which point it becomes sticky and the z-index is updated to change the position from behind the post previews, to in front of the post previews.  A drop shadow is added to visually reinforce this change.

## Installation
