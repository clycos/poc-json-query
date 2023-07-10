import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Subject, EmpInfo } from 'src/assets/interfaces';
import emp from '../../assets/empData.json';

@Component({
  selector: 'material-search-dd',
  templateUrl: './material-search-dd.component.html',
  styleUrls: ['./material-search-dd.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
  ],
})
export class MaterialSearchDDComponent implements OnInit {
  empInfo: EmpInfo[] = emp;
  subjList: Subject[] = [];
  myControl = new FormControl('');
  filteredOptions: Observable<Subject[]> | undefined;

  ngOnInit() {
    this.getSubjectDropDown(this.empInfo);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private fb = inject(FormBuilder);
  //TBD - need to add these to the form
  addressForm = this.fb.group({
    subj: '',
    dept: ['', Validators.required],
    crn: '',
  });

  getSubjectDropDown(jsonArray: any[]) {
    const uniqueSubj = [
      ...new Set(
        jsonArray.map((item) =>
          JSON.stringify({
            subj_code: item.subj_code,
            subj_desc: item.subj_desc,
          })
        )
      ),
    ].map((item) => JSON.parse(item));

    // assign uniquesub to subjList and then sort
    this.subjList = uniqueSubj.sort((a, b) =>
      a.subj_code > b.subj_code ? 1 : -1
    );
  }

  private _filter(value: string): Subject[] {
    const filterValue = value.toLowerCase();

    return this.subjList.filter(
      (option) =>
        option.subj_code.toLowerCase().includes(filterValue) ||
        option.subj_desc.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(event: any): void {
    console.log(this.addressForm.value);
  }
}
