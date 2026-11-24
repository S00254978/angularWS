import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Service()
export class CarService {
	private http = inject(HttpClient);
	private apiUrl = 'http://localhost:3000/api/v1/cars';

	getCars(): Observable<Car[]> {
		return this.http.get<Car[]>(this.apiUrl);
	}
}
