// The following structure is copied from zipRetrieval file. See reference there.
// Chat GPT for debugging.
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavesRetrieval {
  private savesState = new BehaviorSubject<any>(null);
  savesObj = this.savesState.asObservable();

  private submittedState = new Subject<void>();
  savesSubmitted = this.submittedState.asObservable();

  updateSaves(userSaves: any) {
    this.savesState.next(userSaves);
    this.submittedState.next();
  }

}
