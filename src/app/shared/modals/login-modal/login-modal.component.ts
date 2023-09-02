import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ErrorService } from '../../../core/services/error.service';
import { BUTTON_SIZE, BUTTON_TYPES, MODAL_IDS } from '../../../core/enums';
import { ButtonData } from '../../../core/interfaces';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
	selector: 'app-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
	public loginForm!: FormGroup;
	public loginButtonData: ButtonData = {
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
		this.loginForm = new FormGroup<any>({
			email: new FormControl('', [Validators.required]),
			password: new FormControl('', [Validators.required])
		});
	}

	public login() {
		const { email, password } = this.loginForm.value;

		this.authenticationService.login(email, password).subscribe({
			next: () => {
				this.toastrService.success('Success login');
				this.modalService.close(MODAL_IDS.LOGIN_MODAL);
			},
			error: (err: any) => {
				this.errorService.showToastrError(err);
			}
		});
	}

	public changeAuthenticationWay() {
		this.modalService.close(MODAL_IDS.LOGIN_MODAL);
		this.modalService.open(MODAL_IDS.REGISTRATION_MODAL);
	}
}
