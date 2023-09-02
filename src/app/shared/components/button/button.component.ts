import { Component, Input } from '@angular/core';
import { ButtonData } from '../../../core/interfaces';
import { BUTTON_SIZE, BUTTON_TYPES } from '../../../core/enums';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
	@Input() disabled: boolean = false;
	@Input() buttonData: ButtonData = {
		type: BUTTON_TYPES.GREEN,
		size: BUTTON_SIZE.SMALL,
		borderRadius: 0
	};
}
