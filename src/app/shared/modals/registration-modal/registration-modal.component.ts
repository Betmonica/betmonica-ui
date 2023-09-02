import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../core/services/error.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ButtonData } from '../../../core/interfaces';
import { BUTTON_SIZE, BUTTON_TYPES, MODAL_IDS } from '../../../core/enums';

@Component({
	selector: 'app-registration-modal',
	templateUrl: './registration-modal.component.html',
	styleUrls: ['./registration-modal.component.scss']
})
export class RegistrationModalComponent implements OnInit {
	public registrationForm!: FormGroup;
	public registrationButtonData: ButtonData = {
		type: BUTTON_TYPES.GREEN,
		size: BUTTON_SIZE.WIDE,
		borderRadius: 2
	};

	constructor(
		private toastrService: ToastrService,
		private modalService: NgxSmartModalService,
		private errorService: ErrorService,
		private authenticationService: AuthenticationService
	) {}

	ngOnInit() {
		this.registrationForm = new FormGroup<any>({
			username: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required])
		});
	}

	public registration() {
		const { username, email, password } = this.registrationForm.value;

		this.authenticationService
			.registration(username, email, password)
			.subscribe({
				next: () => {
					this.toastrService.success('Success login');
					this.modalService.close(MODAL_IDS.REGISTRATION_MODAL);
				},
				error: (err: any) => {
					this.errorService.showToastrError(err);
				}
			});
	}

	public changeAuthenticationWay() {
		this.modalService.close(MODAL_IDS.REGISTRATION_MODAL);
		this.modalService.open(MODAL_IDS.LOGIN_MODAL);
	}
}
