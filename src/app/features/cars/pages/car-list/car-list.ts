import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { CarCard } from '../../components/car-card/car-card';

@Component({
  imports: [AsyncPipe, CarCard],
  selector: 'app-car-list',
  styleUrl: './car-list.scss',
  templateUrl: './car-list.html',
})
export class CarList implements OnInit {
  private carService = inject(CarService);
  cars$!: Observable<Car[]>;

  ngOnInit(): void {
    this.cars$ = this.carService.getCars();
  }
}
