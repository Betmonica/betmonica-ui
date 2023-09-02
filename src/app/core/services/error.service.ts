import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class ErrorService {
	constructor(private toastrService: ToastrService) {}

	public showToastrError(err: any): void {
		if (err?.error?.error?.type === 'AUTHENTICATE') {
			this.toastrService.error(err?.error?.error?.message);
		} else {
			this.toastrService.error(
				JSON.stringify(err.error),
				'Something went wrong'
			);
		}
	}
}
