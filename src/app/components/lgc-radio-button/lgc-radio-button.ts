import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { ControlContainer, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'lgc-radio-button',
  imports: [RadioButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './lgc-radio-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true, optional: true }),
    },
  ],
})
export class LgcRadioButton {
  readonly controlName = input<string>();
  readonly selectedModel = model<unknown>(null);
  readonly label = input<string>();
  readonly name = input.required<string>();
  readonly value = input.required<string>();
  readonly id = input.required<string>();
  readonly disabled = model(false);
}
