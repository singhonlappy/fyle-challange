


import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { forkJoin } from 'rxjs';

interface UserDetail {
  avatar_url: string;
  name: string;
  bio: string;
  location: string;
  twitter_username: string
  url: string

}
interface UserRepo {
  name: string;
  description: string;
  languages_url: string

}
interface UserRepoLanguages {
  name: string;
  description: string;
  languages_url: string

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Object: any;
  constructor(private apiService: ApiService) { }

  user: string = '';
  userdetail: UserDetail =
    {
      avatar_url: '',
      name: '',
      bio: '',
      location: '',
      twitter_username: '',
      url: '',

    }; // Initialize with empty string or default value
  userrepo: UserRepo[] = []
  userrepolanguages: object | any;

  onSubmit() {
    this.apiService.getUser(this.user).subscribe((data: UserDetail | any) => {
      // Assign the data to the userdetail object
      this.userdetail = data;
      console.log('User Detail:', this.userdetail);
    });
    this.apiService.getUserrepo(this.user).subscribe((data: UserRepo | any) => {
      // Assign the data to the userrepo object
      this.userrepo = data;
      console.log('User Repo:', this.userrepo);
      // Fetch languages for each repository


    });
    

  }
}
