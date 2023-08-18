import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Select } from '@ngxs/store';
import { MatchesState } from '../../../store/states/matches.state';
import { MatchesService } from '../../../core/services/matches.service';
import { MatchData } from '../../../core/interfaces';

@Component({
  selector: 'app-matches-page',
  templateUrl: './matches-page.component.html',
  styleUrls: ['./matches-page.component.scss']
})
export class MatchesPageComponent implements OnInit, OnDestroy {
  public liveMatches: MatchData[] = [];
  public upcomingMatches: MatchData[] = [];

  @Select(MatchesState.liveMatches) private liveMatches$!: Observable<MatchData[]>;
  @Select(MatchesState.upcomingMatches) private upcomingMatches$!: Observable<MatchData[]>;
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private matchesService: MatchesService) {
  }

  ngOnInit() {
    this.matchesService.autoUpdateMatches().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: () => {
        console.log('Matches updated!');
      }
    });

    this.liveMatches$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (liveMatches: MatchData[]) => {
        this.liveMatches = liveMatches;
      }
    });

    this.upcomingMatches$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (upcomingMatches: MatchData[]) => {
        this.upcomingMatches = upcomingMatches;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
