# Twitter clone

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick start

### `npm run start`

Runs the app which will by default listen on port 3000 of `localhost`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Organization

I've tried to take advantage of importing assets directly into React using the import
statements. There are a few places where this makes sense. You'll find that most of
the image URL's are actually pointing to a separate git repo. This was done to help
speed up the development without having to write an Express portion of the app.

There were three phases of this app:
1) It started as a simplistic Express JS app with a single static file rule to host everything at `/public`

2) The assets were compiled and hosted on a github pages site at: [First Draft of this App](https://wmerfalen.github.io/clones/)

3) It's final form: this repo with build instructions and the ability to run this locally.

### Static assets

Fonts, CSS, SVGs are hosted in their own respective folders (`src/fonts`,`src/css`,`src/svg` respectively).

### Maintaining state

I use localStorage to keep track of login status, likes, and new tweets.
Those can be found in the `src/storage` directory. 
New tweets and replies are stored in localStorage.


### Data source

I hosted a `tweets.json` file which is where the app gets a feed of tweets over the network.
As part of the challenge, it was mentioned that a network request should be simulated to
demonstrate handling of asynchronous code. I used a simple script to create that specific
json file. You can find that script in `src/utils/tweet-generator.js`. To generate the
feed, simply run it using `node src/utils/tweet-generator.js`. It will create a `tweets.json`
file in the current directory.

### React Router DOM

A very simplistic router is created and used in `App.js`. Initially, I wanted to create
a deep link system, but getting the code reorganized and refactored ended up taking up
all my extra time. I still want to write a deep link library that could work with any
app.

### How tweets are fetched

I don't like the way I did this *at all*, but I'm essentially using a `useEffect` call
to trigger the fetching of tweets. This has no explicit dependencies and will get triggered
if the app ever starts to go through changes in the future. Admittedly, I do not know
of a better way to load the Tweets *after* the `Home` component is rendered.


### How Likes are persisted

Checkout `src/storage/likes.jsx`. A simple wrapper function called `Likes()` handles
everything for you.

### How login state is persisted

`src/storage/login-state.jsx` uses a simple localStorage mechanism to set/get 
login status. Clicking on *any* of the sign up/login links will set your login
state to logged in and will render the logged in portion of Twitter.

### Fixed banner at the bottom of the page

`src/storage/login-tracker.jsx` attaches a banner at the bottom of the page that
gives you a link to login/sign up. As stated above, logging in and signing in are
the same thing and will cause the page to render differently depending on that value.


