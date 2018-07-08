import * as React from "react";

interface ISearchResultsProps {
  results: any;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185/";

const SearchResults = (props: ISearchResultsProps) => {
    const results = props.results.map((r: any) => (
        <div key={r.id} className="d-flex justify-content-center media">
          <img className="align-self-center" src={`${IMAGE_BASE_URL}${r.poster_path}`} width="100px"
          alt={`${r.original_title} poster`} />
          <div className="media-body">
            <h5 className="mt-0">{r.original_title}</h5>
            <p>{r.release_date}</p>
          </div>
        </div>
    ));
    return results;
};

export default SearchResults;
