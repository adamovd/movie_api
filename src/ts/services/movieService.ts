import axios from "axios";
import { IOmdbResponse } from "../models/IOmdbResponse";
import { SearchResult } from "../models/SearchResult";

export async function searchMovies(
  searchText: string,
  page: number
): Promise<SearchResult> {
  let response = await axios.get<IOmdbResponse>(
    `http://www.omdbapi.com/?apikey=62a4b431&s=${searchText}&page=${page}`
  );

  let returnValue: SearchResult = new SearchResult(
    response.data.Search,
    response.data.totalResults
  );
  return returnValue;
}
