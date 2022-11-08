export class Movie {
    constructor(public title:string, public year:string, public imageUrl:string, public type:string) {
        parseInt(year);
        type.toUpperCase();
    }
}