export class Movie {
    // year: number;

    constructor(public title:string, public year:string , public imageUrl:string, public type:string) {
        // this.year = parseInt(year);
        // this.type.toUpperCase();
    }
}

//får felmeddelande på parseInt och toUpperCase, samt att det inte går att använda year i main.js