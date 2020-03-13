// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/activestorage").start()
require("@rails/ujs").start()
require("turbolinks").start()

require("bootstrap/dist/js/bootstrap")
require("channels")

// Import stylesheets.
import('stylesheets/application.scss')

// Import images and add a helper to get their path.
const images = require.context('../images', true)
const imagePath = (name) => images(name, true)

// Support component names relative to this directory.
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
