import { Component, OnInit } from '@angular/core';
import { RandomService } from './random.service';
import * as sportsItems from "./data/test-assignment.json";
import { sportsModel } from './sportsModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'glomo';
  sports:sportsModel[]=[];
  game:string;
  httpResponse:any;
  selectedChoice:string;
  successMsg:string;
  failureMsg:string;

  choices =  [
    {
        id: 1,
        description: 'Home Team win (Team A)'
    },
    {
        id: 2,
        description: 'draw'
    },
    {
      id: 3,
      description: 'Away Team win (Team B)'
    }
]

  constructor(private service:RandomService) { }

  ngOnInit() {
    this.failureMsg =''
    this.successMsg='';
    console.log('Random component getting called --> ',sportsItems.default)    
    this.sports= sportsItems.default;
    const random = this.generateRandomNumber(0, sportsItems.default.length-1)
     console.log("Random Number :", random)
     console.log('Random SportName : ',sportsItems.default[random].sport)
     this.game = sportsItems.default[random].sport;
  }

  generateRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    saveChoice(){
      console.log('Save choice : ')
      this.service.getJSON(this.selectedChoice,this.game).subscribe(
        results => {
        this.httpResponse = results;
        
         if(results.status =='200'){
          this.successMsg = "Your choice saved successfully."
         }else{
           this.failureMsg = "Some went wrong, please retry by refreshing screen."
         }
         } );  
    }

    selection(id){
      console.log('Selected :', id);
      this.selectedChoice = id;
    }
}
