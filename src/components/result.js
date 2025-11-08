import {UrlManager} from "../utils/url-manager.js";

export class Result {
    constructor() {
        this.routeParams = UrlManager.getQueryParams();
        document.getElementById('result-score').innerText = this.routeParams.score + '/' + this.routeParams.total;
        document.getElementById('answer-result').onclick = function () {
            location.href = `#/answer?score=${this.routeParams.score}&total=${this.routeParams.total}&id=${this.routeParams.id}&userAnswer=${this.routeParams.userAnswer}`;
        }.bind(this);
    }
}