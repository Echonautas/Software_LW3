import { Component, OnInit  } from '@angular/core';
import { Team } from '../f1';
//import { TEAMS } from '../mock-f1';
import { F1ServiceService } from '../f1-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  teams : Team[] = [];
  constructor(private F1service: F1ServiceService){}
  ngOnInit(): void {
    this.getTeams();
  }
  getTeams(): void {
  this.F1service.getTeams()
    .subscribe(teams => this.teams = teams.slice(1,5));
  }
}
