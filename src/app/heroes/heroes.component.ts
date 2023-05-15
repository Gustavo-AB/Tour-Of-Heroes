import { Component, inject } from '@angular/core';
import { IHero } from '../IHero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})


export class HeroesComponent {

  selectedHero?: IHero

  heroes?: IHero[]

  constructor(private heroService: HeroService){}


  onSelect(hero:IHero){
    this.selectedHero = hero
  }

  getHeroes(){
    this.heroes = this.heroService.getHeroes()
  }

  ngOnInit():void{
    this.getHeroes()
  }
}
