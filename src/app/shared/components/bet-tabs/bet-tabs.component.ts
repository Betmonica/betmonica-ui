import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TeamData } from '../../../core/interfaces';

@Component({
	selector: 'app-bet-tabs',
	templateUrl: './bet-tabs.component.html',
	styleUrls: ['./bet-tabs.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => BetTabsComponent)
		}
	]
})
export class BetTabsComponent implements ControlValueAccessor {
	@Input() public homeTeam!: TeamData;
	@Input() public awayTeam!: TeamData;
	public selectedTeamId!: string;

	onChange!: (selectedTeamId: string) => void;

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {}

	writeValue(obj: any): void {
		this.selectedTeamId = obj;
	}

	updateSelectedTeamId(newSelectedTeamId: string): void {
		this.selectedTeamId = newSelectedTeamId;
		this.onChange(this.selectedTeamId);
	}
}
