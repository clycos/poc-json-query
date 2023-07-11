import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Subject, EmpInfo } from 'src/assets/interfaces';
import emp from '../../assets/empData.json';

@Component({
  selector: 'material-search-dd',
  templateUrl: './material-search-dd.component.html',
  styleUrls: ['./material-search-dd.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
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
  constructor() {}
  empInfo: EmpInfo[] = emp;
  subjList: Subject[] = [];
  filteredOptions: Observable<Subject[]> | undefined;

  private fb = inject(FormBuilder);
  courseForm = this.fb.group({
    subj_code: [''],
  });

  ngOnInit() {
    this.getSubjectDropDown(this.empInfo);

    this.filteredOptions = this.courseForm.get('subj_code')?.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

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
    console.log(this.courseForm.value);
  }
}
