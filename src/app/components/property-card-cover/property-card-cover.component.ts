import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-property-card-cover',
  templateUrl: './property-card-cover.component.html',
  styleUrl: './property-card-cover.component.scss'
})
export class PropertyCardCoverComponent {

  // Chat-GPT showed how to accept input from a parent component here.
  @Input() listing: any;


}
