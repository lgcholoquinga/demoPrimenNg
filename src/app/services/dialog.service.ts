import {
  ComponentRef,
  computed,
  Injectable,
  InputSignal,
  signal,
  Signal,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IActionDialog } from '../components/pbo-dialog/pbo-dialog';

export type InputValue<T> = T extends InputSignal<infer U> ? U : T;
export type ComponentInputs<T> = { [K in keyof T]?: InputValue<T[K]> };

export interface DialogConfig {
  title?: string;
  description?: string;
  question?: string;
  icon?: string;
  iconStyleClass?: string;
  actions?: IActionDialog[] | IActionDialog;
}

export interface DialogComponentOptions<T> {
  inputs?: ComponentInputs<T>;
  outputs?: Record<string, (event: unknown) => void>;
}

export abstract class DialogBase {
  abstract readonly visible: Signal<boolean>;
  abstract readonly config: Signal<DialogConfig>;

  abstract register(vcr: ViewContainerRef): void;
  abstract show(config: DialogConfig): Observable<string>;
  abstract show<T>(component: Type<T>, options?: DialogComponentOptions<T>): void;
  abstract show<T>(config: DialogConfig, component: Type<T>, options?: DialogComponentOptions<T>): void;
  abstract handleAction(action: string): void;
  abstract close(): void;
}

@Injectable({ providedIn: 'root' })
export class DialogData extends DialogBase {
  private vcr?: ViewContainerRef;
  private componentRef?: ComponentRef<unknown>;
  readonly #visible = signal(false);
  readonly #config = signal<DialogConfig>({});
  #action?: Subject<string>;

  public readonly visible = computed(() => this.#visible());
  public readonly config = computed(() => this.#config());

  public register(vcr: ViewContainerRef): void {
    this.vcr = vcr;
  }

  /** Solo config del modal — sin componente dinámico */
  show(config: DialogConfig): Observable<string>;
  /** Solo componente dinámico — sin config del modal */
  show<T>(component: Type<T>, options?: DialogComponentOptions<T>): void;
  /** Config del modal + componente dinámico */
  show<T>(config: DialogConfig, component: Type<T>, options?: DialogComponentOptions<T>): void;

  show<T>(
    configOrComponent: DialogConfig | Type<T>,
    componentOrOptions?: Type<T> | DialogComponentOptions<T>,
    options?: DialogComponentOptions<T>,
  ): Observable<string> | void {
    if (typeof configOrComponent === 'function') {
      // show(component, options?)
      this.#config.set({});
      this.loadComponent(configOrComponent, componentOrOptions as DialogComponentOptions<T>);
      this.#visible.set(true);
    } else if (typeof componentOrOptions === 'function') {
      // show(config, component, options?)
      this.#config.set(configOrComponent);
      this.loadComponent(componentOrOptions, options);
      this.#visible.set(true);
    } else {
      // show(config) — retorna Observable<string>
      this.#action?.complete();
      this.#action = new Subject<string>();
      this.#config.set(configOrComponent);
      this.vcr?.clear();
      this.componentRef = undefined;
      this.#visible.set(true);
      return this.#action.asObservable();
    }
  }

  public handleAction(action: string): void {
    this.#action?.next(action);
  }

  public close(): void {
    this.#visible.set(false);
    this.#config.set({});
    this.vcr?.clear();
    this.componentRef?.destroy();
    this.componentRef = undefined;
    this.#action?.complete();
    this.#action = undefined;
  }

  private loadComponent<T>(component: Type<T>, options?: DialogComponentOptions<T>): void {
    if (!this.vcr) {
      throw new Error('ViewContainerRef is not registered');
    }

    this.vcr.clear();
    this.componentRef = this.vcr.createComponent(component);

    for (const [key, value] of Object.entries(options?.inputs ?? {})) {
      if (key in (this.componentRef.instance as object)) {
        (this.componentRef.instance as Record<string, unknown>)[key] = value;
      }
    }

    if (options?.outputs) {
      for (const [key, handler] of Object.entries(options.outputs)) {
        if (key in (this.componentRef.instance as object)) {
          (this.componentRef.instance as Record<string, { subscribe: (h: unknown) => void }>)[
            key
          ].subscribe(handler);
        }
      }
    }
  }
}
