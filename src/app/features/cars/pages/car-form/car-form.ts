import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateCarDto } from '../../models/car.model';
import { CarService } from '../../services/car.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-car-form',
  templateUrl: './car-form.html',
})
export class CarForm {
  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);

  carForm = this.formBuilder.nonNullable.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: this.formBuilder.control<number | null>(null),
  });

  saving = signal(false);
  saveError = signal<string | null>(null);

  onSubmit(): void {
    const { make, model, year } = this.carForm.getRawValue();
    const newCar: CreateCarDto = { make, model, year: year ?? undefined };

    this.saving.set(true);
    this.saveError.set(null);

    this.carService.addCar(newCar).subscribe({
      next: (response) => {
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
      },
    });
  }
}