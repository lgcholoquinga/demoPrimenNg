import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogRef } from './dialog-ref';
import { DialogConfig, DialogRequest } from './dialog.tokens';

@Injectable({ providedIn: 'root' })
export class DialogService {
  readonly open$ = new Subject<DialogRequest>();

  open<R = unknown>(config: DialogConfig): DialogRef<R>;
  open<T, D = unknown, R = unknown>(component: Type<T>, config?: DialogConfig<D>): DialogRef<R>;
  open<R = unknown>(
    componentOrConfig: Type<unknown> | DialogConfig,
    config?: DialogConfig,
  ): DialogRef<R> {
    const dialogRef = new DialogRef<R>();
    const isComponent = typeof componentOrConfig === 'function';
    const request: DialogRequest = {
      component: isComponent ? componentOrConfig : undefined,
      config: isComponent ? (config ?? {}) : (componentOrConfig as DialogConfig),
      dialogRef,
    };
    this.open$.next(request);
    return dialogRef;
  }
}
