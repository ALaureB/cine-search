import * as React from "react";

interface ISearchResultsProps {
  results: any;
}

const SearchResults = (props: ISearchResultsProps) => {
    const results = props.results.map((r: any) => (
        <li key={r.id}>
          {r.original_title}
          {r.popularity}
        </li>
    ));
    return <ul>{results}</ul>;
};

export default SearchResults;
