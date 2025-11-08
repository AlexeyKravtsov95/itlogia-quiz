import {Router} from "./router.js";

class App {
    constructor() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanged.bind(this));
        window.addEventListener('popstate', this.handleRouteChanged.bind(this));
    }

    handleRouteChanged() {
        this.router.openRoute()
    }
}

(new App());