import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../../models/car.model';

@Component({
  imports: [RouterLink],
  selector: 'app-car-card',
  templateUrl: './car-card.html',
})
export class CarCard {
  car = input.required<Car>();
}