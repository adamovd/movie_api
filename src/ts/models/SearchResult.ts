import { IMovie } from "./IMovie";

export class SearchResult {
  totalAmount: number;

  constructor(public Search: IMovie[], totalResults: string) {
    this.totalAmount = parseInt(totalResults);
  }
}
