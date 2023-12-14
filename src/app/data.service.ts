import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private subsectionDataMap = new Map<string, SubsectionData>();
  private myObservable = new BehaviorSubject<number>(0);
  myObservable$ = this.myObservable.asObservable();
  private newObservable = new BehaviorSubject<MyObservableData>({
    subsectionKey: '',
    filledCount: 0,
    totalCount: 0,
  });

  getMyObservable(): Observable<MyObservableData> {
    return this.newObservable.asObservable();
  }

  updateMandatoryFieldCounts(
    subsectionKey: string,
    filledCount: number,
    totalCount: number
  ) {
    let subsectionData = this.subsectionDataMap.get(
      subsectionKey
    ) as SubsectionData;

    if (!subsectionData) {
      subsectionData = new SubsectionData();
      this.subsectionDataMap.set(subsectionKey, subsectionData);
    }
    subsectionData.filledMandatoryFieldsCount$.next(filledCount);
    subsectionData.totalMandatoryFieldsCount$.next(totalCount);
    this.myObservable.next(filledCount);
    this.newObservable.next({
      subsectionKey: subsectionKey,
      filledCount: filledCount,
      totalCount: totalCount,
    });
  }

  getFilledMandatoryFieldsCount$(subsectionKey: string): Observable<number> {
    const subsectionData = this.subsectionDataMap.get(subsectionKey);

    return subsectionData
      ? subsectionData.filledMandatoryFieldsCount$
      : new BehaviorSubject<number>(0);
  }
  // getFilledMandatoryFieldsCount$(subsectionKey: string): Observable<number> {
  //   const subsectionData = this.subsectionDataMap.get(subsectionKey);

  //   const observable = subsectionData
  //     ? subsectionData.filledMandatoryFieldsCount$
  //     : new BehaviorSubject<number>(0);

  //   // Subscribe to the observable to log the emitted values
  //   observable.subscribe((count) => {
  //     console.log(`Filled Mandatory Fields Count for ${subsectionKey}:`, count);
  //   });

  //   return observable;
  // }

  getTotalMandatoryFieldsCount$(subsectionKey: string): Observable<number> {
    const subsectionData = this.subsectionDataMap.get(subsectionKey);
    return subsectionData
      ? subsectionData.totalMandatoryFieldsCount$
      : new BehaviorSubject<number>(0);
  }
}

class SubsectionData {
  filledMandatoryFieldsCount$ = new BehaviorSubject<number>(0);
  totalMandatoryFieldsCount$ = new BehaviorSubject<number>(0);
}
export interface MyObservableData {
  subsectionKey: string;
  filledCount: number;
  totalCount: number;
}
