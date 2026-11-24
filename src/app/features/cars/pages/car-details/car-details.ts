import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.html',
})
export class CarDetails implements OnInit {
  private carService = inject(CarService);
  readonly id = input.required<string>();
  readonly car = signal<Car | null>(null);

  ngOnInit(): void {
    this.carService.getCarById(this.id()).subscribe((car) => {
      this.car.set(car);
    });
  }
}