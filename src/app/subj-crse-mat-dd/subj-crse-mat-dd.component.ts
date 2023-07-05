import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { EmpInfo, Subject } from 'src/assets/interfaces';
import emp from '../../assets/empData.json';

@Component({
  selector: 'app-subj-crse-mat-dd',
  templateUrl: './subj-crse-mat-dd.component.html',
  styleUrls: ['./subj-crse-mat-dd.component.css'],
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
export class SubjCrseMatDDComponent implements OnInit {
  empInfo: EmpInfo[] = emp;
  subjList: Subject[] = [];

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

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

    if (this.subjList.length === 1) {
      this.myControl.get('subj')?.setValue(this.subjList[0].subj_code);
    }
  }

  ngOnInit() {
    this.getSubjectDropDown(this.empInfo);

    // following not used, part of example
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    console.log('TBD');

    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
