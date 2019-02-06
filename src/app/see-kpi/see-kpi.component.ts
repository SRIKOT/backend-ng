import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from "rxjs";

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-see-kpi',
  templateUrl: './see-kpi.component.html',
  styleUrls: ['./see-kpi.component.css']
})
export class SeeKPIComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoggedIn: Observable<boolean>;
  mobileQuery: MediaQueryList;
  loading;

  private _mobileQueryListener: () => void;

  @ViewChild('snav') snav;

  constructor(
    public auth: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.isLoggedIn = auth.isLoggedIn();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.loading = false;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy");
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
          this.loading = false;
        }
      });
  }

  toggle() {
    this.snav.toggle();
  }
}
