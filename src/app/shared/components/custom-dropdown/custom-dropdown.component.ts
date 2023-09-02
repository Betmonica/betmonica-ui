import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownItem } from '../../../core/interfaces';

@Component({
	selector: 'app-custom-dropdown',
	templateUrl: './custom-dropdown.component.html',
	styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent {
	@Input() public list: DropdownItem[] = [];

	@Input() public isOpen: boolean = false;
	@Output() public isOpenChange: EventEmitter<boolean> =
		new EventEmitter<boolean>();
}
