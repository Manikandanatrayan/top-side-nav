import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
    });

    this.profileForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.updateMandatoryFieldCount();
      });
  }
  updateMandatoryFieldCount() {
    const totalMandatoryFields = Object.values(
      this.profileForm.controls
    ).filter(
      (control) =>
        control.validator && control.validator({} as AbstractControl) !== null
    ).length;

    const filledMandatoryFieldsCount = Object.values(
      this.profileForm.controls
    ).filter(
      (control) =>
        control.validator &&
        control.validator({} as AbstractControl) !== null &&
        control.value !== null &&
        control.value !== ''
    ).length;

    this.dataService.updateMandatoryFieldCounts(
      'profile_information',
      filledMandatoryFieldsCount,
      totalMandatoryFields
    );
    this.dataService.getFilledMandatoryFieldsCount$('profile_information');
  }
}
