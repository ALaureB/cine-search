import axios from "axios";
import * as React from "react";
import SearchResults from "./SearchResults";

interface ISearchState {
    query: string;
    results: any;
}

// tslint:disable-next-line:no-var-requires
const API_ENDPOINT = "https://api.themoviedb.org/3/";
const SEARCH_URL = "search/movie?language=fr&include_adulte=false";
// tslint:disable-next-line:no-var-requires
const API_KEY = require("./config.json").API_KEY;

class Search extends React.Component<{}, ISearchState> {
    public search: HTMLInputElement;
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            query: "",
            // tslint:disable-next-line:trailing-comma
            results: []
        };
    }

    public handleInputChange = () => {
        this.setState({
          // tslint:disable-next-line:trailing-comma
          query: this.search.value
        }, () => {
          if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
              this.getInfo();
            }
          }
        });
    }

    public getInfo = () => {
        axios.get(`${API_ENDPOINT}${SEARCH_URL}&api_key=${API_KEY}&query=${this.state.query}`)
          .then(({ data }) => {
            console.log("data", data);
            this.setState({
              // tslint:disable-next-line:trailing-comma
              results: data.results
            });
            console.log("results", this.state.results);
          });
      }

    public render() {
        return (
            <div>
                <form>
                    <input
                        placeholder="Search for..."
                        ref={(input) => this.search = input}
                        onChange={this.handleInputChange}
                    />
                    <p>{this.state.query}</p>
                    <SearchResults results={this.state.results} />
                </form>
            </div>
        );
    }
}

export default Search;
