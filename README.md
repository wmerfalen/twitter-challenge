# Twitter clone

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick start

### `npm ci && npm run start`

Runs the app which will by default listen on port 3000 of `localhost`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Building for production

### `npm run build`

This will create an optimized production build in the `build` folder.
For more details regarding this process, see: [Creating a production build](https://create-react-app.dev/docs/production-build/)

## Deploying code

The easiest way to serve the application is to use the `serve` npm package.
This will create a static file server and allow you to host the app with a single line of code.

```
npm install --save-dev serve
node ./node_modules/serve/bin/serve.js -s build
```

## Organization

I've tried to take advantage of importing assets directly into React using the import
statements. There are a few places where this makes sense. You'll find that most of
the image URL's are actually pointing to a separate git repo. This was done to help
speed up the development without having to write an Express portion of the app.

There were three phases of this app:

1. It started as a simplistic Express JS app with a single static file rule to host everything at `/public`

2. The assets were compiled and hosted on a github pages site at: [First Draft of this App](https://wmerfalen.github.io/clones/)

3. It's final form: this repo with build instructions and the ability to run this locally.

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

I don't like the way I did this _at all_, but I'm essentially using a `useEffect` call
to trigger the fetching of tweets. This has no explicit dependencies and will get triggered
if the app ever starts to go through changes in the future. Admittedly, I do not know
of a better way to load the Tweets _after_ the `Home` component is rendered.

### How Likes are persisted

Checkout `src/storage/likes.jsx`. A simple wrapper function called `Likes()` handles
everything for you.

### How login state is persisted

`src/storage/login-state.jsx` uses a simple localStorage mechanism to set/get
login status. Clicking on _any_ of the sign up/login links will set your login
state to logged in and will render the logged in portion of Twitter.

### Fixed banner at the bottom of the page

`src/storage/login-tracker.jsx` attaches a banner at the bottom of the page that
gives you a link to login/sign up. As stated above, logging in and signing in are
the same thing and will cause the page to render differently depending on that value.

### Home component

`src/views/home/index.jsx`. This is the only other view in the app. It's the feed and
all the content you see when you're logged in or visiting Twitter.

### Login modal

`src/login/login-modal.jsx`. To trigger this modal, log out and click on either the
like button or the reply button on any tweet.

### Composing a tweet

`src/editor/compose-tweet.jsx`. Initially, the strategy was to utilize an `<input>` element
that would be styled appropriately. That was ditched in favor of the `contenteditable`
feature. This makes for a very clean interface that I feel closely resembles the behaviour
seen on Twitter. It might make sense to have a fallback to an input tag (polyfill) for those
browsers that haven't played catch up.

### The beauty of re-use

The same code that's used to compose a tweet at the top of the page is also used when you
reply to a tweet (the popup when you reply/add another tweet).

### What I left out

Since all network access is essentially read-only, it didn't make sense to handle complex
tweet content like image uploads. While this isn't hard to flush to localStorage (since you
can get direct access to the base64-encoded image data), I didn't feel like it was a super
high priority feature.

Nearly every link in the left nav does nothing except change the URL to a hash.

### What could be improved

-   I apologize for the use of divs to position elements, but I honestly don't know of a better
    technique. This may be overkill in some places.

-   I feel like there are still parts of the styling that could look a lot better. Please note that I
    was a backend developer for nearly 90% of my career. If there are any places where I can improve,
    _please_ let me know. I thrive on criticism.

-   One thing I could not get to work effectively is highlighting the text that goes over the char limit.
    This proved to be a very frustrating feature to emulate.

-   Proportions may be different/funky. I tried to use media queries to get the content to look centered
    at different resolutions. I'm guessing using flexbox CSS rules would make this easier.

-   I'm not exactly sure how to code styles using class-less CSS, but I'm open to learning it. I've seen
    some libraries that claim to be class-less CSS, but have found very little in terms of learning
    how to approach the concept in general. Maybe I'm not looking hard enough.

-   At some point, I'd like to be able to change the theme of the App. This could be done fairly easily
    as I use CSS variables for every color. There might be a few edge cases there that I haven't thought
    of, but the work has been done to make that fairly easy.

### Last updated: 2021-10-07 23:39
