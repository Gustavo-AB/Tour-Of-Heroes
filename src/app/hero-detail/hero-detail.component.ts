import { Component, Input } from '@angular/core';
import { IHero } from '../IHero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {

  @Input() hero?:IHero

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(){
    this.getHero()
  }

  getHero():void{
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.heroService.getHero(id).subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }


}
