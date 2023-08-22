import { Component, Input } from '@angular/core';
import { MatchData } from '../../../core/interfaces';
import { DatePipe } from '@angular/common';

export interface MatchWithDates {
  date: string;
  matches: MatchData[];
}

@Component({
  selector: 'app-match-rows',
  templateUrl: './match-rows.component.html',
  styleUrls: ['./match-rows.component.scss']
})
export class MatchRowsComponent {
  constructor(private datePipe: DatePipe) {
  }

  public _matches: MatchWithDates[] = [];

  @Input()
  public set matches(matches: MatchData[]) {
    const matchesWithDate: MatchWithDates[] = [];

    const sortedMatches: MatchData[] = matches.sort((matchA: MatchData, matchB: MatchData) => {
      return new Date(matchA.startDate).getTime() - new Date(matchB.startDate).getTime();
    });

    sortedMatches.forEach((match: MatchData) => {
      const date: Date = new Date(match.startDate);

      const countIndexes: number = matchesWithDate.length - 1;

      const lastBlockDate: string = this.datePipe.transform(matchesWithDate?.[countIndexes]?.date, 'MM-dd-YYYY') || '';
      const formattedDate: string = this.datePipe.transform(date, 'MM-dd-YYYY') || '';


      if (formattedDate !== lastBlockDate) {
        matchesWithDate[countIndexes + 1] = {
          date: formattedDate,
          matches: [match]
        };
      } else {
        matchesWithDate[countIndexes].matches.push(match);
      }
    });

    this._matches = matchesWithDate;
  }
}
