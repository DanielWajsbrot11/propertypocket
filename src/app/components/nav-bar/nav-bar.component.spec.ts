import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar.component';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { ZipRetrieval } from '../../services/zipRetrieval.service';
import { SavesRetrieval } from '../../services/savesRetrieval.service';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockAngularFireAuth: any;
  let mockRouter: any;
  let mockBackendService: any;
  let mockZipRetrieval: any;
  let mockSavesRetrieval: any;

  beforeEach(async () => {
    mockAngularFireAuth = {
      authState: of({ displayName: 'Test User', photoURL: 'test-url' }),
      currentUser: Promise.resolve({}),
      signOut: jasmine.createSpy('signOut')
    };

    mockRouter = {
      events: of(new NavigationEnd(0, '', '')),
      url: '/saved'
    };

    mockBackendService = {
      getBookmarks: jasmine.createSpy('getBookmarks').and.returnValue(Promise.resolve([])),
      getLikes: jasmine.createSpy('getLikes').and.returnValue(Promise.resolve([]))
    };

    mockZipRetrieval = {
      updateZip: jasmine.createSpy('updateZip')
    };

    mockSavesRetrieval = {
      updateSaves: jasmine.createSpy('updateSaves')
    };

    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [FormsModule],
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: Router, useValue: mockRouter },
        { provide: BackendService, useValue: mockBackendService },
        { provide: ZipRetrieval, useValue: mockZipRetrieval },
        { provide: SavesRetrieval, useValue: mockSavesRetrieval }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu state', () => {
    expect(component.isMenuOpen).toBeFalse();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();
    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should update showZip to hidden when navigating to /saved', () => {
    component.ngOnInit();
    expect(component.showZip).toBe('hidden');
  });

  it('should update username and userPhotoUrl on authState change', () => {
    component.ngOnInit();
    expect(component.username).toBe('Test User');
    expect(component.userPhotoUrl).toBe('test-url');
  });

  it('should call updateZip on submitZip', async () => {
    component.zip = '12345';
    await component.submitZip();
    expect(mockZipRetrieval.updateZip).toHaveBeenCalledWith('12345');
  });

  it('should call backendService and savesRetrieval on submitZip if user is logged in', async () => {
    mockAngularFireAuth.currentUser = Promise.resolve({}); 
    await component.submitZip();
    expect(mockBackendService.getBookmarks).toHaveBeenCalled();
    expect(mockBackendService.getLikes).toHaveBeenCalled();
    expect(mockSavesRetrieval.updateSaves).toHaveBeenCalledWith({ bookmarks: [], likes: [] });
  });
  
  it('should not call backendService and savesRetrieval on submitZip if user is not logged in', async () => {
    mockAngularFireAuth.currentUser = Promise.resolve(null); 
    await component.submitZip();
    expect(mockBackendService.getBookmarks).not.toHaveBeenCalled();
    expect(mockBackendService.getLikes).not.toHaveBeenCalled();
    expect(mockSavesRetrieval.updateSaves).not.toHaveBeenCalled();
});


});