// The following is copied from Chat-GPT on how to handle state management
// with our zipcode, aka how to get information passed from one component to another.

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ZipRetrieval {
  private zipState = new BehaviorSubject<string>('');
  zipValue = this.zipState.asObservable();

  private submittedState = new Subject<void>();
  zipSubmitted = this.submittedState.asObservable();

  updateZip(zip: string) {
    this.zipState.next(zip);
    this.submittedState.next();
  }

}
