# Fyle Frontend Challenge

## Who is this for?

This challenge is meant for candidates who wish to intern at Fyle and work with our engineering team. The candidate should be able to commit to at least 6 months of dedicated time for internship.

## Why work at Fyle?

Fyle is a fast-growing Expense Management SaaS product. We are ~40 strong engineering team at the moment. 

We are an extremely transparent organization. Check out our [careers page](https://careers.fylehq.com) that will give you a glimpse of what it is like to work at Fyle. Also, check out our Glassdoor reviews [here](https://www.glassdoor.co.in/Reviews/Fyle-Reviews-E1723235.htm). You can read stories from our teammates [here](https://stories.fylehq.com).

## Challenge outline

This challenge involves implementing application using github api. 

The services that you need to use are already implemented - check out ApiService.

You can see details of this challenge [here](https://fyleuniverse.notion.site/fyleuniverse/Fyle-Frontend-development-challenge-cb5085e5e0864e769e7b98c694400aaa)

__Note__ - This challenge is in angular. We work on angular frameworks & after you join we expect the same from you. Hence it is required to complete this assignement in angular itself.

## What happens next?

You will hear back within 48 hours from us via email.

## Installation

1. Fork this repository to your github account.
2. Clone the forked repository and proceed with steps mentioned below.

### Install requirements
* Install angular cli [Ref](https://angular.io/cli)
* `npm install` in this repository 

## Development server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Further help

Visit the [Angular Documentation](https://angular.io/guide/styleguide) to learn more.
Styling is to be strictly done with [Tailwind](https://tailwindcss.com/docs/installation).




///As directed in the file here is the test case for the App component:


describe('AppComponent', () => {
  let component: AppComponent;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    // Create a spy object for the ApiService methods
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser', 'getUserRepo', 'getUserRepo1', 'getLanguagesForRepo']);

    TestBed.configureTestingModule({
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    });

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>; // Inject the spy object
    component = new AppComponent(apiService); // Create an instance of the component
  });

  it('should fetch user details on form submission', () => {
    const userDetail = { avatar_url: 'avatar_url', name: 'John Doe', bio: 'Software Developer', location: 'New York', twitter_username: 'johndoe', url: 'https://github.com/johndoe' };
    apiService.getUser.and.returnValue(of(userDetail)); // Mock the getUser method to return a user detail

    component.user = 'johndoe';
    component.onSubmit(); // Call the onSubmit method

    expect(apiService.getUser).toHaveBeenCalledWith('johndoe'); // Check if getUser method was called with correct parameter
    expect(component.userdetail).toEqual(userDetail); // Check if userdetail is updated correctly
  });

  
});


// Test case for the service getUser 


describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding requests after each test
  });

  it('should retrieve user details by username', () => {
    const username = 'testuser';
    const dummyUser = { id: 1, login: 'testuser' };

    service.getUser(username).subscribe(user => {
      expect(user).toEqual(dummyUser); // Check if the returned user matches the dummy user
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}`); // Expect a single HTTP request to this URL
    expect(req.request.method).toBe('GET'); // Ensure that the HTTP method is GET

    req.flush(dummyUser); // Respond to the request with the dummy user data
  });
});
