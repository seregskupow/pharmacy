import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private _favsCount = new BehaviorSubject<number[]>([]);

  public favsCount = this._favsCount.asObservable();

  constructor() {}

  getFavourites() {
    const favs = JSON.parse(localStorage.getItem('favourites') as string) || [];
    this._favsCount.next(favs);
  }

  addFavourite(id: number) {
    const currentFav =
      JSON.parse(localStorage.getItem('favourites') as string) || [];
    const newFav = [...currentFav, id];
    this._favsCount.next(newFav);
    localStorage.setItem('favourites', JSON.stringify(newFav));
  }

  removeFavourite(id: number) {
    const currentFav =
      JSON.parse(localStorage.getItem('favourites') as string) || [];
    const newFav = currentFav.filter((item: number) => item !== id);
    this._favsCount.next(newFav);
    localStorage.setItem('favourites', JSON.stringify(newFav));
  }
}
