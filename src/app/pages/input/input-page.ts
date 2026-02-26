import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LgcInput } from '../../components';

@Component({
  selector: 'lgc-input-page',
  imports: [LgcInput, ReactiveFormsModule, FormsModule, JsonPipe],
  templateUrl: './input-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputPage {
  private readonly fb = inject(FormBuilder);

  // ── 1. Reactive form ─────────────────────────────────────────────────────
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get emailCtrl() {
    return this.form.controls.email;
  }
  get passwordCtrl() {
    return this.form.controls.password;
  }

  // ── 2. Signal model  [(value)] sin formulario ────────────────────────────
  username = signal('');

  // ── 3. Template-driven  [(ngModel)] ─────────────────────────────────────
  ngModelValue = '';
}
