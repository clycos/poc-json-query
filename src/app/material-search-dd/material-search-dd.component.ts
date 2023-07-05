import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

interface blah {
  name: string;
  nameID: string;
}

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
  myControl = new FormControl('');
  options1: string[] = ['One', 'Two', 'Three'];
  options2: blah[] = [
    { nameID: '1', name: '1-One' },
    { nameID: '2', name: '2-Two' },
    { nameID: '3', name: '3-Three' },
  ];
  filteredOptions: Observable<blah[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): blah[] {
    const filterValue = value.toLowerCase();

    return this.options2.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
