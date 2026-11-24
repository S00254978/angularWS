import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Car, CreateCarDto } from '../models/car.model';

@Service()
export class CarService {
	private http = inject(HttpClient);
	private apiUrl = 'http://localhost:3000/api/v1/cars';

	getCars(): Observable<Car[]> {
		return this.http.get<Car[]>(this.apiUrl);
	}

	getCarById(id: string): Observable<Car> {
		return this.http.get<Car>(`${this.apiUrl}/${id}`);
	}

	addCar(car: CreateCarDto): Observable<Car> {
		return this.http.post<Car>(this.apiUrl, car);
	}
}
