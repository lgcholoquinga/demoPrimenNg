import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LgcRadioButton } from '../../components';

@Component({
  selector: 'lgc-radio-button-page',
  imports: [LgcRadioButton, ReactiveFormsModule],
  templateUrl: './radio-button-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RadioButtonPage {
  private readonly fb = inject(FormBuilder);
  selectedIngredient = signal<string>('');
  form = this.fb.nonNullable.group({
    ingre: ['', [Validators.required]],
  });

  ingredients = signal([
    { label: 'Eggs', id: 'eggs001', value: 'eggs' },
    { label: 'Flour', id: 'flour001', value: 'flour' },
    { label: 'Sugar', id: 'sugar001', value: 'sugar' },
  ]);
}
