import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LgcSelect } from '../../components';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'lgc-select-page',
  imports: [LgcSelect, FormsModule, ReactiveFormsModule],
  templateUrl: './select-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectPage {
  private fb = inject(FormBuilder);

  cities = signal<City[]>([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ]);

  // Reactive form
  form = this.fb.nonNullable.group({
    city: ['RM', [Validators.required]],
  });

  // Template-driven (ngModel)
  selectedCity = signal<City | null>(null);
}
