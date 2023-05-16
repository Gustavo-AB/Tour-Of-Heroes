import { Component, inject } from '@angular/core';
import { IHero } from '../IHero';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})


export class HeroesComponent {

  selectedHero?: IHero

  heroes: IHero[] = []

  constructor(
    private heroService: HeroService
  ){}

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as IHero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  getHeroes():void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

  ngOnInit():void{
    this.getHeroes()
  }
}
