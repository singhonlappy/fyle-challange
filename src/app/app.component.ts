import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { forkJoin } from 'rxjs';

interface UserDetail {
  avatar_url: string;
  name: string;
  bio: string;
  location: string;
  twitter_username: string;
  url: string;
}

interface UserRepo {
  name: string;
  description: string;
  languages_url: string;
  languages: string;
}
interface UserRepo1 {
  name: string;
  description: string;
  languages_url: string;
  languages: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private apiService: ApiService) { }

  user: string = '';
  userdetail: UserDetail = {
    avatar_url: '',
    name: '',
    bio: '',
    location: '',
    twitter_username: '',
    url: '',
  };
  userrepo: UserRepo[] = [];
  userrepo1: UserRepo1[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number[] = [];

  // Add the method to handle change in items per page
  onItemsPerPageChange() {
    // When the user changes the items per page, reset currentPage to 1

    // Fetch repositories with the updated items per page
    this.fetchUserRepos();
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  // Calculate total pages
  calculateTotalPages(totalItems: number, itemsPerPage: number): void {
    const totalPages = totalItems <= itemsPerPage ? 1 : Math.ceil(totalItems / itemsPerPage);
    this.totalPages = Array(totalPages).fill(0).map((_, index) => index + 1);
    
  }



  // Fetch repositories for the selected page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
      this.fetchUserRepos(); // Call method to fetch repositories for the selected page
    }
  }


  onSubmit() {

    this.itemsPerPage = 10;
    this.apiService.getUser(this.user).subscribe((data: UserDetail | any) => {
      this.userdetail = data;
      
      this.storeData('userDetail', this.userdetail); // Store user detail in local storage
    });

    this.fetchUserRepos();
  }


  fetchUserRepos() {
    this.apiService.getUserRepo1(this.user)
      .subscribe((data: UserRepo[] | any) => {
        this.userrepo = data;
        
        this.storeData('userRepo', this.userrepo); // Store user repos in local storage


        this.apiService.getUserRepo(this.user, this.currentPage, this.itemsPerPage)
          .subscribe((data: UserRepo[] | any) => {
            this.userrepo1 = data;
            this.storeData('userRepo1', this.userrepo1);


            // Fetch languages for each repository
            this.userrepo1.forEach((repo: any) => {
              this.apiService.getLanguagesForRepo(repo.languages_url)
                .subscribe((languagesData: any) => {
                  repo.languages = languagesData;
                  
                  this.storeData(`languages_${repo.name}`, repo.languages); // Store languages for each repo in local storage
                });
            });




          });


        // Calculate total pages
        this.calculateTotalPages(this.userrepo.length, this.itemsPerPage);





      });
  }


  prevPage() {
    
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchUserRepos();
    }
  }

  nextPage() {
    
    
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.fetchUserRepos();
    }
  }


  storeData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }


}
