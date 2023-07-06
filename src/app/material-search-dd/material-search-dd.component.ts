import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Subject } from 'src/assets/interfaces';
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
  subjList: Subject[] = [];
  myControl = new FormControl('');
  options2: Subject[] = [
    { subj_desc: '1', subj_code: '1-One' },
    { subj_desc: '2', subj_code: '2-Two' },
    { subj_desc: '3', subj_code: '3-Three' },
  ];
  filteredOptions: Observable<Subject[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Subject[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter((option) =>
      option.subj_code.toLowerCase().includes(filterValue)
    );
  }
}
