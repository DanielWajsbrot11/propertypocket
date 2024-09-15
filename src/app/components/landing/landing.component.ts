import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  zipCode: string = '';
  recentProperties: any[] = [
    { name: 'Property 1', icon: 'home' },
    { name: 'Property 2', icon: 'home2' },
    { name: 'Property 3', icon: 'home3' },
    
  ];

  constructor(private router: Router) {}

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement; 
    this.zipCode = inputElement.value;
  }

  searchProperties() {
    if (this.zipCode) {
      
      // will fix later
      this.router.navigate(['/home', this.zipCode]);
    }
  }
}
