import axios from "axios";
import * as React from "react";
import SearchResults from "./SearchResults";

interface ISearchState {
  numberOfResults: number;
  query: string;
  results: any;
}

const API_ENDPOINT = "https://api.themoviedb.org/3/";
const SEARCH_URL = "search/movie?language=fr&include_adulte=false";
// tslint:disable-next-line:no-var-requires
const API_KEY = require("./config.json").API_KEY;

class Search extends React.Component<{}, ISearchState> {
    public search: HTMLInputElement;
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
          numberOfResults: 0,
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
          if (this.state.query && this.state.query.length > 0) {
              this.getInfo();
          } else {
            this.setState({
              numberOfResults: 0,
              // tslint:disable-next-line:trailing-comma
              results: []
            });
          }
        });
    }

    public getInfo = () => {
        axios.get(`${API_ENDPOINT}${SEARCH_URL}&api_key=${API_KEY}&query=${this.state.query}`)
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
          .catch( (error) => {
            console.log(error);
          });
      }

    public render() {
        return (
          <div>
            <form>
               <input
                  placeholder="Search for a movie..."
                  ref={(input) => this.search = input}
                  onChange={this.handleInputChange}
                  className="px-2 py-1"
                  id="input"
                />
                <p className="mt-2">{this.state.query.length > 0 ? this.displayNumberOfResults(this.state.numberOfResults) : ""}</p>
                <SearchResults results={this.state.results} />
            </form>
          </div>
        );
    }

    public displayNumberOfResults = (numberOfResults: number) => {
      if (numberOfResults === 0) {
        return "No results";
        } else if (numberOfResults === 1) {
          return "1 result";
        } else {
          const numberOfResultsFormatted: string = numberOfResults.toLocaleString("fr-FR");
          return `${numberOfResultsFormatted } results`;
      }
    }

}

export default Search;
