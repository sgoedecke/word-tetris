# Babel-bungalow

Like the Tower of Babel, only smaller. Minimal boilerplate for setting up Webpack and Babel.

## Installation

Just clone the repo.

## Usage

Babel-bungalow builds `app.js` to `bundle.js`, which gets displayed by `index.html`. Your code goes in `src/app.js`. Tweaking `webpack.config.js` to alter this behaviour should be a breeze though.

Eslint is included in the package, which is not quite minimal but very useful all the same.

`npm run lint` runs eslint. `npm run build` bundles your code with webpack. If you're deploying on Github Pages, you shouldn't need any additional configuration to make `index.html` visible to the world.
