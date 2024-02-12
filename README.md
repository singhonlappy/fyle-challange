# Fyle Frontend Challenge  

# Description:

In this project I have designed an Angular single-page application (SPA) that takes a GitHub username as input and displays the public Github repositories belonging to that user.

Used Tailwind CSS for Styling

NPM package manager has been used 



# This SPA is made using Angular and Tailwind CSS and all the files are public on github , further it has been build using VS CODE and deployed on the GitHub Pages . Mentioned below are links of the Repo and Spa deployed verison. 
Link of Repository :  https://github.com/singhonlappy/fyle-challange.git

Online link   :       https://singhonlappy.github.io/fyle-challange/








/.................................  Test Cases   ................................/

# As directed in the file here is the test case for the App component:


# App Component test case
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



/-------------------------------------------------------------------------------------------------------------------------------------/
 # getUser Test Case


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
