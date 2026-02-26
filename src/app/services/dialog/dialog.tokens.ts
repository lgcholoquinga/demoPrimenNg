import { InjectionToken, Type } from '@angular/core';
import { DialogRefLike } from './dialog-ref';

export const DIALOG_DATA = new InjectionToken<unknown>('DIALOG_DATA');

export type DialogPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topleft'
  | 'topright'
  | 'bottomleft'
  | 'bottomright';

export interface DialogConfig<D = unknown> {
  header?: string;
  modal?: boolean;
  closable?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  maximizable?: boolean;
  position?: DialogPosition;
  style?: Record<string, string>;
  styleClass?: string;
  appendTo?: string | HTMLElement;
  data?: D;
}

export interface DialogRequest<D = unknown> {
  component?: Type<unknown>;
  config: DialogConfig<D>;
  dialogRef: DialogRefLike;
}
