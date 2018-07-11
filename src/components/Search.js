define(["require", "exports", "axios", "react", "./SearchResults"], function (require, exports, axios_1, React, SearchResults_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const API_ENDPOINT = "https://api.themoviedb.org/3/";
    const SEARCH_URL = "search/movie?language=fr&include_adulte=false";
    // tslint:disable-next-line:no-var-requires
    const API_KEY = require("./config.json").API_KEY;
    class Search extends React.Component {
        constructor(props) {
            super(props);
            this.handleInputChange = () => {
                this.setState({
                    // tslint:disable-next-line:trailing-comma
                    query: this.search.value
                }, () => {
                    if (this.state.query && this.state.query.length > 0) {
                        this.getInfo();
                    }
                    else {
                        this.setState({
                            numberOfResults: 0,
                            // tslint:disable-next-line:trailing-comma
                            results: []
                        });
                    }
                });
            };
            this.getInfo = () => {
                axios_1.default.get(`${API_ENDPOINT}${SEARCH_URL}&api_key=${API_KEY}&query=${this.state.query}`)
                    .then(({ data }) => {
                    console.log("data", data);
                    if (data && data.results) {
                        this.setState({
                            numberOfResults: data.total_results,
                            results: data.results
                        });
                    }
                    console.log("results", this.state.results);
                })
                    .catch((error) => {
                    console.log(error);
                });
            };
            this.displayNumberOfResults = (numberOfResults) => {
                if (numberOfResults === 0) {
                    return "No results";
                }
                else if (numberOfResults === 1) {
                    return "1 result";
                }
                else {
                    const numberOfResultsFormatted = numberOfResults.toLocaleString("fr-FR");
                    return `${numberOfResultsFormatted} results`;
                }
            };
            this.state = {
                numberOfResults: 0,
                query: "",
                // tslint:disable-next-line:trailing-comma
                results: []
            };
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("form", null,
                    React.createElement("input", { placeholder: "Search for a movie...", ref: (input) => this.search = input, onChange: this.handleInputChange, className: "px-2 py-1", id: "input" }),
                    React.createElement("p", { className: "mt-2" }, this.state.query.length > 0 ? this.displayNumberOfResults(this.state.numberOfResults) : ""),
                    React.createElement(SearchResults_1.default, { results: this.state.results }))));
        }
    }
    exports.default = Search;
});
