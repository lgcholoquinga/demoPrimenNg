import { Subject } from 'rxjs';

/** Contrato mínimo que necesita la maquinaria interna (LgcDynamicDialog, DialogRequest). */
export interface DialogRefLike {
  close(result?: unknown): void;
}

export class DialogRef<R = unknown> implements DialogRefLike {
  private readonly subject = new Subject<R | undefined>();
  readonly afterClosed$ = this.subject.asObservable();

  close(result?: unknown): void {
    this.subject.next(result as R | undefined);
    this.subject.complete();
  }
}
