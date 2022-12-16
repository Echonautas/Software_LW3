import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Team } from './f1';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const teams =[{ id: 2, name: 'Oracle Red Bull Racing' },
    { id: 3, name: 'Scuderia Ferrari' },
    { id: 4, name: 'Mercedes-AMG Petronas' },
    { id: 5, name: 'BWT Alpine F1 Team' },
    { id: 6, name: 'McLaren Formula 1 Team' },
    { id: 7, name: 'Alfa Romeo F1 Team ORLEN' },
    { id: 8, name: 'Aston Martin Aramco Cognizant Formula One Team' },
    { id: 9, name: 'MoneyGram Haas F1 Team' },
    { id: 10, name: 'Scuderia AlphaTauri' }
  ];
    return {teams};
  }
  
  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(teams: Team[]): number {
    return teams.length > 0 ? Math.max(...teams.map(f1 => f1.id)) + 1 : 11;
  }
}
