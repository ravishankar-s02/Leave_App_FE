import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // BehaviorSubject holds the latest section state with a default from localStorage or 'leave'
  private sectionSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('selectedSection') || 'leave'
  );

  // Observable for components to subscribe and react to changes
  section$: Observable<string> = this.sectionSubject.asObservable();

  // Method to update and persist selected section
  setSection(section: string): void {
    localStorage.setItem('selectedSection', section); // Persist across reloads
    this.sectionSubject.next(section); // Emit new section value to subscribers
  }
}
