import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxInfiniteScrollComponent } from './ngx-infinite-scroll.component';
import { PaginationDummyService } from '../../services/pagination-dummy.service';
import { BackendService } from "../../services/backend.service";
import { ZipRetrieval } from '../../services/zipRetrieval.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of, Subscription } from 'rxjs';

describe('NgxInfiniteScrollComponent', () => {
  let component: NgxInfiniteScrollComponent;
  let fixture: ComponentFixture<NgxInfiniteScrollComponent>;
  let paginationService: jasmine.SpyObj<PaginationDummyService>;
  let backendService: jasmine.SpyObj<BackendService>;
  let zipRetrieval: jasmine.SpyObj<ZipRetrieval>;
  let angularFireAuth: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(async () => {
    const paginationServiceSpy = jasmine.createSpyObj('PaginationDummyService', ['setZipCode', 'callZillowAPI', 'getItems']);
    const backendServiceSpy = jasmine.createSpyObj('BackendService', ['']);
    const zipRetrievalSpy = jasmine.createSpyObj('ZipRetrieval', ['zipValue', 'zipSubmitted']);
    const angularFireAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['']);

    await TestBed.configureTestingModule({
      declarations: [ NgxInfiniteScrollComponent ],
      providers: [
        { provide: PaginationDummyService, useValue: paginationServiceSpy },
        { provide: BackendService, useValue: backendServiceSpy },
        { provide: ZipRetrieval, useValue: zipRetrievalSpy },
        { provide: AngularFireAuth, useValue: angularFireAuthSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxInfiniteScrollComponent);
    component = fixture.componentInstance;
    paginationService = TestBed.inject(PaginationDummyService) as jasmine.SpyObj<PaginationDummyService>;
    backendService = TestBed.inject(BackendService) as jasmine.SpyObj<BackendService>;
    zipRetrieval = TestBed.inject(ZipRetrieval) as jasmine.SpyObj<ZipRetrieval>;
    angularFireAuth = TestBed.inject(AngularFireAuth) as jasmine.SpyObj<AngularFireAuth>;

    zipRetrieval.zipValue = of('12345');
    zipRetrieval.zipSubmitted = of(undefined); // Corrected to match Observable<void>
    paginationService.callZillowAPI.and.returnValue(Promise.resolve());
    paginationService.getItems.and.returnValue(of([]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle loading state', () => {
    component.isLoading = false;
    component.toggleLoading();
    expect(component.isLoading).toBeTrue();
    component.toggleLoading();
    expect(component.isLoading).toBeFalse();
  });

  it('should initialize and subscribe to zipRetrieval', async () => {
    spyOn(zipRetrieval.zipValue, 'subscribe').and.callThrough();
    spyOn(zipRetrieval.zipSubmitted, 'subscribe').and.callThrough();
    
    await component.ngOnInit();
    
    expect(zipRetrieval.zipValue.subscribe).toHaveBeenCalled();
    expect(zipRetrieval.zipSubmitted.subscribe).toHaveBeenCalled();
});

  it('should append data on scroll', async () => {
    spyOn(component, 'appendData');
    component.onScroll();
    expect(component.currentPage).toBe(2);
    expect(component.appendData).toHaveBeenCalled();
  });

  
});