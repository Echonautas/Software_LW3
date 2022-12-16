import { Component, OnInit } from '@angular/core';
import { Team } from '../f1';
//import { TEAMS } from '../mock-f1';
import { F1ServiceService } from '../f1-service.service';
//import { MessageService } from '../message.service';

@Component({
  selector: 'app-f1',
  templateUrl: './f1.component.html',
  styleUrls: ['./f1.component.css']
})
export class F1Component implements OnInit {

  teams: Team[] = [];

  constructor(private F1service: F1ServiceService) {}

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.F1service.getTeams()
        .subscribe(teams => this.teams = teams);
  }
  
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.F1service.addTeam({ name } as Team)
      .subscribe(f1 => {
        this.teams.push(f1);
      });
  }

  delete(f1: Team): void {
    this.teams = this.teams.filter(h => h !== f1);
    this.F1service.deleteTeam(f1.id).subscribe();
  }

  // f1: Team = {
  //   id: 1,
  //   name: 'RedBull'
  // };
  //teams = TEAMS;
  // selectedTeam?: Team

  // onSelect(f1: Team): void {
  //   this.selectedTeam = f1;
  //   this.messageService.add(`TeamsComponent: Selected team id=${f1.id}`);
}

