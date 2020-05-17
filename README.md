# built-a-bot


## Navigation Control

* Enabling HTML5 history mode

* Preventing non-existing pages to be navigated to

* Preventing pages to be navigated away

### HTML5 History mode 

It removes the `#` in your URL, for more elegant routes. To set it, in your `router/index.js` set your `mode` property as follows: `mode: 'history'`. 

Once history mode is activated, keep in mind your backend isn't aware of your front-end final paths, all it is aware is of original url (URL up to the #), html's and index.js potentially the user getting unsettling 404's if bookmarking and navigating directly to those paths ---So set-up your backend accordingly.

For this, set up your backend to always fallback to the `index.js`, This depends deeply on the web server your site is depending on. Documentation related to  HTML 5 History Mode can be found following this link: https://router.vuejs.org/guide/essentials/history-mode.html


### Navigation: into non-existing sites

`beforeEnter` method in your routes configuration runs a validation to either let or prevent going into certain URL's

### Navigation: away

To prevent user leaving away current page, at least not before receiving a confirmation message, use `beforeRouteLeave` method in your component. You can get help from a variable that holds the state of the criteria you want to hold.