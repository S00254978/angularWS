import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-car-form',
  templateUrl: './car-form.html',
})
export class CarForm {
  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);

  carForm = this.formBuilder.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: [''],
  });

  onSubmit(): void {
    const carData: Car = this.carForm.value as Car;

    this.carService.addCar(carData).subscribe({
      next: () => {
        this.router.navigate(['/cars']);
      },
      error: (error: Error) => {
        console.error('Error adding car:', error);
      },
    });
  }
}