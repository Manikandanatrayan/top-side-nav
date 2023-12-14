import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'side-nav',
  templateUrl: 'sidenav-overview.html',
  styleUrls: ['sidenav-overview.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SideNavOverview {
  selectedSubsection: any;
  selectedSection: any;
  filledMandatoryFieldsCount: number = 0;
  totalMandatoryFieldsCount: number = 0;
  filledMandatoryFieldsCountMap = new Map<string, Observable<number>>();
  totalMandatoryFieldsCountMap = new Map<string, Observable<number>>();
  filledMandatoryFieldsCount$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  totalMandatoryFieldsCount$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  sections = [
    {
      section: 'Provider Information',
      subsections: [
        {
          name: 'Profile Information',
          route: '/provider/profile_information',
          totalMandatoryFieldsCount: 9,
          filledMandatoryFieldsCount: 0,
          filledMandatoryFieldsCount$: new BehaviorSubject<number>(0),
          totalMandatoryFieldsCount$: new BehaviorSubject<number>(9),
        },
        {
          name: 'Address',
          route: '/provider/address',
          totalMandatoryFieldsCount: 9,
          filledMandatoryFieldsCount: 0,
          filledMandatoryFieldsCount$: new BehaviorSubject<number>(0),
          totalMandatoryFieldsCount$: new BehaviorSubject<number>(0),
        },
      ],
    },
    {
      section: 'Practice Information',
      subsections: [
        {
          name: 'Subsection 2.1',
          route: '/provider/profile-info',
          totalMandatoryFieldsCount: 9,
          filledMandatoryFieldsCount: 0,
          filledMandatoryFieldsCount$: new BehaviorSubject<number>(0),
          totalMandatoryFieldsCount$: new BehaviorSubject<number>(0),
        },
        {
          name: 'Subsection 2.2',
          route: '/subsection2_2',
          totalMandatoryFieldsCount: 10,
          filledMandatoryFieldsCount: 0,
          filledMandatoryFieldsCount$: new BehaviorSubject<number>(0),
          totalMandatoryFieldsCount$: new BehaviorSubject<number>(0),
        },
      ],
    },
    {
      section: 'License & Certificates',
      subsections: [
        {
          name: 'Subsection 2.1',
          route: '/subsection2_1',
          totalMandatoryFieldsCount: 12,
          filledMandatoryFieldsCount: 0,
          filledMandatoryFieldsCount$: new BehaviorSubject<number>(0),
          totalMandatoryFieldsCount$: new BehaviorSubject<number>(0),
        },
        {
          name: 'Subsection 2.2',
          route: '/subsection2_2',
          totalMandatoryFieldsCount: 20,
          filledMandatoryFieldsCount: 0,
          filledMandatoryFieldsCount$: new BehaviorSubject<number>(0),
          totalMandatoryFieldsCount$: new BehaviorSubject<number>(0),
        },
      ],
    },
  ];
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.sections.forEach((section) => {
      section.subsections.forEach((subsection) => {
        const key = subsection.route;
        const routeParts = key.split('/');
        const route = routeParts[routeParts.length - 1];
        this.dataService.getMyObservable().subscribe((data) => {
          console.log(
            'new data:',
            data.subsectionKey,
            data.filledCount,
            data.totalCount
          );
          if (data.subsectionKey === route) {
            subsection.filledMandatoryFieldsCount$.next(data.filledCount);
            subsection.totalMandatoryFieldsCount$.next(data.totalCount);
          }
        });
      });
    });
  }
  onSubsectionClick(subsection: any) {
    this.selectedSubsection = subsection;
    this.router.navigate([subsection.route]);
  }
  onSectionClick(section: any) {
    this.selectedSection = section;
    this.selectedSubsection = section.subsections[0];
    console.log(this.selectedSubsection.route);
    this.router.navigate([this.selectedSubsection.route]);
  }
}
