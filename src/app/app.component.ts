import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor(
    private apiService: ApiService
  ) {}

  githubUsername: string='';

  onsubmit()
{
  this.apiService.getUser(this.githubUsername).subscribe(console.log);
}

 
}
