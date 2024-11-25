import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyCardComponent } from './property-card.component';
import { BackendService } from '../../services/backend.service';
import { SavesRetrieval } from '../../services/savesRetrieval.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

describe('PropertyCardComponent', () => {
  let component: PropertyCardComponent;
  let fixture: ComponentFixture<PropertyCardComponent>;
  let mockBackendService: any;
  let mockSavesRetrieval: any;
  let mockAngularFireAuth: any;
  let mockApiService: any;

  beforeEach(async () => {
    mockBackendService = {
      getNumLikes: jasmine.createSpy('getNumLikes').and.returnValue(Promise.resolve(5)),
      makeBookmark: jasmine.createSpy('makeBookmark').and.returnValue(Promise.resolve()),
      deleteBookmark: jasmine.createSpy('deleteBookmark').and.returnValue(Promise.resolve()),
      makeLike: jasmine.createSpy('makeLike').and.returnValue(Promise.resolve()),
      deleteLike: jasmine.createSpy('deleteLike').and.returnValue(Promise.resolve()),
      makeComment: jasmine.createSpy('makeComment').and.returnValue(Promise.resolve()),
      getZPIDComments: jasmine.createSpy('getZPIDComments').and.returnValue(Promise.resolve([])),
      getBookmarks: jasmine.createSpy('getBookmarks').and.returnValue(Promise.resolve([])),
      getLikes: jasmine.createSpy('getLikes').and.returnValue(Promise.resolve([]))
    };

    mockSavesRetrieval = {
      savesObj: of({ bookmarks: [{ zpid: '12345' }], likes: [{ zpid: '12345' }] })
    };

    mockAngularFireAuth = {
      currentUser: Promise.resolve({ displayName: 'Test User' })
    };

    mockApiService = {
      returnSingleProperty: jasmine.createSpy('returnSingleProperty').and.returnValue(Promise.resolve({ responsivePhotos: [1, 2, 3], datePostedString: '2022-01-01', yearBuilt: 2000, resoFacts: { taxAnnualAmount: 1000, hoaFeeTotal: 100 }, lotAreaValue: 0.5, lotAreaUnits: 'acres', annualHomeownersInsurance: 500, attributionInfo: { agentName: 'Agent', agentEmail: 'agent@example.com', agentPhoneNumber: '123-456-7890' }, description: 'Test description' }))
    };

    await TestBed.configureTestingModule({
      declarations: [PropertyCardComponent],
      providers: [
        { provide: BackendService, useValue: mockBackendService },
        { provide: SavesRetrieval, useValue: mockSavesRetrieval },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCardComponent);
    component = fixture.componentInstance;
    component.listing = { zpid: '12345' };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle modal state', () => {
    expect(component.isModalOpen).toBeFalse();
    component.toggleModal();
    expect(component.isModalOpen).toBeTrue();
    component.toggleModal();
    expect(component.isModalOpen).toBeFalse();
  });

  it('should advance left', () => {
    component.singlePropertyData = { responsivePhotos: [1, 2, 3] };
    component.leftIndex = 0;
    component.currentIndex = 1;
    component.rightIndex = 2;
    component.advanceLeft();
    expect(component.leftIndex).toBe(2);
    expect(component.currentIndex).toBe(0);
    expect(component.rightIndex).toBe(1);
  });

  it('should advance right', () => {
    component.singlePropertyData = { responsivePhotos: [1, 2, 3] };
    component.leftIndex = 0;
    component.currentIndex = 1;
    component.rightIndex = 2;
    component.advanceRight();
    expect(component.leftIndex).toBe(1);
    expect(component.currentIndex).toBe(2);
    expect(component.rightIndex).toBe(0);
  });

  it('should get property card image', async () => {
    await component.getPropertyCardImage();
    expect(mockApiService.returnSingleProperty).toHaveBeenCalledWith('12345');
    expect(component.singlePropertyData).toEqual({ responsivePhotos: [1, 2, 3], datePostedString: '2022-01-01', yearBuilt: 2000, resoFacts: { taxAnnualAmount: 1000, hoaFeeTotal: 100 }, lotAreaValue: 0.5, lotAreaUnits: 'acres', annualHomeownersInsurance: 500, attributionInfo: { agentName: 'Agent', agentEmail: 'agent@example.com', agentPhoneNumber: '123-456-7890' }, description: 'Test description' });
    expect(component.imgClicked).toBeTrue();
  });

  it('should initialize component and set likes and bookmarks', async () => {
    await component.ngOnInit();
    expect(mockBackendService.getNumLikes).toHaveBeenCalledWith('12345');
    expect(component.numLikes).toBe(5);
    expect(component.bookmarked).toBeTrue();
    expect(component.liked).toBeTrue();
  });

  /*
  it('should clean up on destroy', () => {
    component.savesSubmissionSubscription = mockSavesRetrieval.savesObj.subscribe();
    spyOn(component.savesSubmissionSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.savesSubmissionSubscription.unsubscribe).toHaveBeenCalled();
  });
  */

  /*
  it('should handle bookmark click', async () => {
    component.bookmarked = false;
    await component.onBookmarkClick();
    expect(mockBackendService.makeBookmark).toHaveBeenCalledWith('12345');
    expect(component.bookmarked).toBeTrue();
  
    component.bookmarked = true;
    await component.onBookmarkClick();
    expect(mockBackendService.deleteBookmark).toHaveBeenCalledWith('12345');
    expect(component.bookmarked).toBeFalse();
  });
  */

  /*
  it('should handle like click', async () => {
    component.liked = false;
    component.numLikes = 5;
    await component.onLikeClick();
    expect(mockBackendService.makeLike).toHaveBeenCalledWith('12345');
    expect(component.liked).toBeTrue();
    expect(component.numLikes).toBe(6);
  
    component.liked = true;
    component.numLikes = 6;
    await component.onLikeClick();
    expect(mockBackendService.deleteLike).toHaveBeenCalledWith('12345');
    expect(component.liked).toBeFalse();
    expect(component.numLikes).toBe(5);
  });
  */

  /*
  it('should handle comment click', async () => {
    component.listing = { zpid: '12345' };
    component.comment = 'Test comment';
    component.comments = [];
  
    const mockUser = { displayName: 'Test User' };
    mockAngularFireAuth.currentUser = Promise.resolve(mockUser);
  
    await component.onCommentClick();
  
    expect(mockBackendService.makeComment).toHaveBeenCalledWith('12345', 'Test comment');
    expect(component.comments.length).toBe(1);
    expect(component.comments[0].comment).toBe('Test comment');
    expect(component.comments[0].name).toBe('Test User');
    expect(component.comment).toBe(''); 
  });
  */

  it('should get listing comments', async () => {
    await component.onGetListingCommentsClick();
    expect(mockBackendService.getZPIDComments).toHaveBeenCalledWith('12345');
    expect(component.comments).toEqual([]);
  });
});