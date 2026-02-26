import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

let inputIdCounter = 0;

@Component({
  selector: 'lgc-input',
  imports: [InputTextModule, FormsModule],
  templateUrl: './lgc-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LgcInput),
      multi: true,
    },
  ],
})
export class LgcInput implements ControlValueAccessor {
  /** Tipo nativo del input (text, email, password, number, …) */
  readonly type = input<string>('text');
  /** Texto del label visible */
  readonly label = input<string>();
  readonly placeholder = input<string>('');
  /** Texto de ayuda bajo el input (se enlaza con aria-describedby) */
  readonly hint = input<string>();
  /** ID personalizado; si no se pasa se genera uno único */
  readonly id = input<string>();
  readonly required = input(false);
  /** Activa el estado de error visual + aria-invalid */
  readonly invalid = input(false);
  /** Ocupa todo el ancho del contenedor */
  readonly fluid = input(false);
  /** Deshabilita el input (sincronizado con CVA setDisabledState) */
  readonly disabled = model(false);

  /**
   * Valor del input.
   * - Reactive forms / ngModel → gestionado internamente por CVA.
   * - Uso directo → enlaza con [(value)]="miVar".
   */
  readonly value = model<string>('');

  private readonly uid = `lgc-input-${++inputIdCounter}`;
  protected readonly inputId = computed(() => this.id() ?? this.uid);
  protected readonly hintId = computed(() => `${this.inputId()}-hint`);

  // ─── CVA callbacks ────────────────────────────────────────────────────────
  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: string): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  // ─────────────────────────────────────────────────────────────────────────

  protected onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  protected onBlur(): void {
    this.onTouched();
  }
}
