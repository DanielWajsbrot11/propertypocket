import { Component, Input } from '@angular/core';

type card = {
  "name" : string,
  "price": number
}

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {

  // Chat-GPT showed how to accept input from a parent component here.
  @Input() listing: card = {"name" : "", "price" : 0};

}
