import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { Team } from '../f1';
import { F1ServiceService } from '../f1-service.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent {
  team: Team | undefined;

  constructor(
    private route: ActivatedRoute,
    private F1service: F1ServiceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTeam();
  }

  getTeam(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.F1service.getTeam(id)
        .subscribe(team => this.team = team);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.team) {
      this.F1service.updateTeam(this.team)
        .subscribe(() => this.goBack());
    }
  }
}
