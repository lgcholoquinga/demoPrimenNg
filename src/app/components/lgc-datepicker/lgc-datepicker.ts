import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

let dpIdCounter = 0;

@Component({
  selector: 'lgc-datepicker',
  imports: [DatePickerModule, FormsModule],
  templateUrl: './lgc-datepicker.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LgcDatepicker),
      multi: true,
    },
  ],
})
export class LgcDatepicker implements ControlValueAccessor {
  /** Texto del label visible asociado al input */
  readonly label = input<string>();
  /** Placeholder del campo de texto */
  readonly placeholder = input('');
  /** Formato de fecha (sintaxis de PrimeNG, ej. dd/mm/yy) */
  readonly dateFormat = input('dd/mm/yy');
  /** Muestra el icono de calendario junto al input */
  readonly showIcon = input(false);
  /** Muestra el icono para limpiar la selección */
  readonly showClear = input(false);
  /** Marca el campo como obligatorio (visual + aria) */
  readonly required = input(false);
  /** Activa el estado de error visual + aria-invalid */
  readonly invalid = input(false);
  /** Ocupa todo el ancho del contenedor */
  readonly fluid = input(false);
  /** Texto de ayuda bajo el input */
  readonly hint = input<string>();
  /** ID personalizado; si no se pasa, se genera uno único */
  readonly id = input<string>();
  /** Estado disabled, sincronizado con CVA setDisabledState */
  readonly disabled = model(false);

  /**
   * Valor del datepicker.
   * - Reactive forms / ngModel → gestionado internamente por CVA.
   * - Uso directo con señales → enlaza con [(value)]="miSignal".
   */
  readonly value = model<Date | null>(null);

  private readonly uid = `lgc-dp-${++dpIdCounter}`;
  protected readonly inputId = computed(() => this.id() ?? this.uid);
  protected readonly hintId = computed(() => `${this.inputId()}-hint`);

  // ─── CVA callbacks ────────────────────────────────────────────────────────
  private onChange: (v: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: Date | null): void {
    this.value.set(val ?? null);
  }

  registerOnChange(fn: (v: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
  // ─────────────────────────────────────────────────────────────────────────

  protected onDateChange(val: Date | null): void {
    this.value.set(val);
    this.onChange(val);
  }

  protected onBlur(): void {
    this.onTouched();
  }
}
