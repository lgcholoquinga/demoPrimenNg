import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LgcDatepicker } from '../../components';

@Component({
  selector: 'lgc-datepicker-page',
  imports: [LgcDatepicker, FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './datepicker-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatepickerPage {
  private readonly fb = inject(FormBuilder);

  // ── 1. Reactive form ──────────────────────────────────────────────────────
  form = this.fb.group({
    birthdate: [null as Date | null, [Validators.required]],
    appointment: [null as Date | null],
  });

  get birthdateCtrl() {
    return this.form.controls.birthdate;
  }

  get appointmentCtrl() {
    return this.form.controls.appointment;
  }

  formSubmitted = false;

  onSubmit(): void {
    this.formSubmitted = true;
    this.form.markAllAsTouched();
  }

  onReset(): void {
    this.formSubmitted = false;
    this.form.reset();
  }

  // ── 2. Signal model [(value)] ─────────────────────────────────────────────
  signalDate = signal<Date | null>(null);

  // ── 3. Template-driven [(ngModel)] ───────────────────────────────────────
  ngModelDate: Date | null = null;

  // ── 4. Disabled / invalid states ──────────────────────────────────────────
  disabledDate: Date | null = null;
}
