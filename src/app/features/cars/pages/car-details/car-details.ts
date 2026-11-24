import { Component, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';

@Component({
  imports: [RouterLink, MatButtonModule],
  selector: 'app-car-details',
  templateUrl: './car-details.html',
})
export class CarDetails {
  private carService = inject(CarService);
  private readonly router = inject(Router);
  readonly id = input.required<string>();
  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);
  readonly initial: LoadState<Car> = { status: 'loading' };
  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.carService.getCarById(id))),
    ),
    { initialValue: this.initial },
  );

  deleteCar(car: Car): void {
    if (!confirm(`Delete ${car.make} ${car.model}?`)) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.carService.deleteCar(car._id).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      },
    });
  }
}