import { Injectable } from '@angular/core';
import { Environment } from '../interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EnvironmentService {
	public environment: Environment = environment;
}
