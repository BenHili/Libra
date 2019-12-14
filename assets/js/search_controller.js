// controllers/gallery_controller.js
import { Controller } from "stimulus";

export default class extends Controller {
  input() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = document.getElementById("search-input").value;
    const location = window.location.pathname.replace(/\//g, "");
    if (/(buy|sell)/.test(location)) {
      window.location.href = `/${location}/?query=${query}`;
    } else {
      const mode = urlParams.get("mode") || "buy";
      window.location.href = `/${mode}/?query=${query}`;
    }
  }
}
