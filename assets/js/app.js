// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";

// Setup Stimulus and controllers
import { Application } from "stimulus";
const application = Application.start();

import SearchController from "./search_controller";
application.register("search", SearchController);

// Initialise turbolinks
import Turbolinks from "turbolinks";
Turbolinks.start();
