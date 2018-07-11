define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185/";
    const SearchResults = (props) => {
        const results = props.results.map((r) => (React.createElement("div", { key: r.id, className: "d-flex justify-content-center media" },
            React.createElement("img", { className: "align-self-center", src: `${IMAGE_BASE_URL}${r.poster_path}`, width: "100px", alt: `${r.original_title} poster` }),
            React.createElement("div", { className: "media-body" },
                React.createElement("h5", { className: "mt-0" }, r.original_title),
                React.createElement("p", null, r.release_date)))));
        return results;
    };
    exports.default = SearchResults;
});
