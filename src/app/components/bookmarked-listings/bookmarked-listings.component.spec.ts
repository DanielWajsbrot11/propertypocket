import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkedListingsComponent } from './bookmarked-listings.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BackendService } from '../../services/backend.service';
import { ApiService } from '../../services/api.service';
import { SavesRetrieval } from '../../services/savesRetrieval.service';
import { of } from 'rxjs';

describe('BookmarkedListingsComponent', () => {
  let component: BookmarkedListingsComponent;
  let fixture: ComponentFixture<BookmarkedListingsComponent>;
  let mockAngularFireAuth: any;
  let mockBackendService: any;
  let mockApiService: any;
  let mockSavesRetrieval: any;

  beforeEach(async () => {
    mockAngularFireAuth = {
      currentUser: Promise.resolve({}),
    };

    mockBackendService = {
      getBookmarks: jasmine.createSpy('getBookmarks').and.returnValue(Promise.resolve([{ zpid: '12345' }])),
      getLikes: jasmine.createSpy('getLikes').and.returnValue(Promise.resolve([]))
    };

    mockApiService = {
      returnSingleProperty: jasmine.createSpy('returnSingleProperty').and.returnValue(Promise.resolve({ propertyData: 'data' }))
    };

    mockSavesRetrieval = {
      updateSaves: jasmine.createSpy('updateSaves')
    };

    await TestBed.configureTestingModule({
      declarations: [BookmarkedListingsComponent],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: BackendService, useValue: mockBackendService },
        { provide: ApiService, useValue: mockApiService },
        { provide: SavesRetrieval, useValue: mockSavesRetrieval }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkedListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /*
  it('should toggle loading state', () => {
    expect(component.isLoading).toBeFalse();
    component.toggleLoading();
    expect(component.isLoading).toBeTrue();
    component.toggleLoading();
    expect(component.isLoading).toBeFalse();
  });
  */

  it('should call backendService and savesRetrieval on ngOnInit if user is logged in', async () => {
    await component.ngOnInit();
    expect(mockBackendService.getBookmarks).toHaveBeenCalled();
    expect(mockBackendService.getLikes).toHaveBeenCalled();
    expect(mockSavesRetrieval.updateSaves).toHaveBeenCalledWith({ bookmarks: [{ zpid: '12345' }], likes: [] });
  });

  /*
  it('should call apiService for each bookmark on ngOnInit', async () => {
    await component.ngOnInit();
    expect(mockApiService.returnSingleProperty).toHaveBeenCalledWith('12345');
    expect(component.items.length).toBe(1);
    expect(component.items).toEqual([{ propertyData: 'data' }]);
  });
  */

  it('should not call backendService and savesRetrieval on ngOnInit if user is not logged in', async () => {
    mockAngularFireAuth.currentUser = Promise.resolve(null);
    await component.ngOnInit();
    expect(mockBackendService.getBookmarks).not.toHaveBeenCalled();
    expect(mockBackendService.getLikes).not.toHaveBeenCalled();
    expect(mockSavesRetrieval.updateSaves).not.toHaveBeenCalled();
  });
});