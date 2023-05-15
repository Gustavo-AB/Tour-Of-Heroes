import { Injectable } from '@angular/core';
import { IHero } from './IHero';
import  { HEROES } from './mock-heroes'


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes():IHero[]{
    return HEROES
  }
}
