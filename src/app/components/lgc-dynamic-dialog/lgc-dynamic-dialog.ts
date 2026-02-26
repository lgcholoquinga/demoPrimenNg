import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Injector,
  input,
  model,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogRef, DialogRefLike } from '../../services/dialog/dialog-ref';
import { DialogService } from '../../services/dialog/dialog.service';
import {
  DIALOG_DATA,
  DialogConfig,
  DialogPosition,
  DialogRequest,
} from '../../services/dialog/dialog.tokens';
import { LgcDialog } from '../lgc-dialog/lgc-dialog';

@Component({
  selector: 'lgc-dynamic-dialog',
  imports: [LgcDialog],
  template: `
    <lgc-dialog
      [(visible)]="visible"
      [header]="activeConfig()?.header ?? header()"
      [modal]="activeConfig()?.modal ?? modal()"
      [closable]="activeConfig()?.closable ?? closable()"
      [draggable]="activeConfig()?.draggable ?? draggable()"
      [resizable]="activeConfig()?.resizable ?? resizable()"
      [maximizable]="activeConfig()?.maximizable ?? maximizable()"
      [position]="activeConfig()?.position ?? position()"
      [style]="activeConfig()?.style ?? style()"
      [styleClass]="activeConfig()?.styleClass ?? styleClass()"
      [closeOnEscape]="closeOnEscape()"
      [dismissableMask]="dismissableMask()"
      [blockScroll]="blockScroll()"
      [appendTo]="appendTo()"
      (onHide)="handleHide()"
    >
      <ng-content />
      <ng-container #customTemplate />
    </lgc-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgcDynamicDialog implements OnInit, OnDestroy {
  readonly header = input<string>();
  readonly visible = model<boolean>(false);
  readonly modal = input<boolean>(true);
  readonly closable = input<boolean>(true);
  readonly draggable = input<boolean>(false);
  readonly resizable = input<boolean>(false);
  readonly maximizable = input<boolean>(false);
  readonly position = input<DialogPosition>('center');
  readonly style = input<Record<string, string>>();
  readonly styleClass = input<string>();
  readonly closeOnEscape = input<boolean>(true);
  readonly dismissableMask = input<boolean>(false);
  readonly blockScroll = input<boolean>(false);
  readonly appendTo = input<string | HTMLElement>('body');

  protected readonly activeConfig = signal<DialogConfig | undefined>(undefined);

  private readonly customTemplate = viewChild('customTemplate', { read: ViewContainerRef });
  private readonly dialogService = inject(DialogService);
  private readonly injector = inject(Injector);
  private readonly cdr = inject(ChangeDetectorRef);

  private currentDialogRef: DialogRefLike | null = null;
  private readonly subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.dialogService.open$.subscribe((req: DialogRequest) => this.handleOpen(req)),
    );
  }

  private handleOpen(request: DialogRequest): void {
    this.customTemplate()?.clear();
    this.currentDialogRef = request.dialogRef;
    this.activeConfig.set(request.config);

    if (request.component) {
      const innerInjector = Injector.create({
        providers: [
          { provide: DIALOG_DATA, useValue: request.config.data },
          { provide: DialogRef, useValue: request.dialogRef },
        ],
        parent: this.injector,
      });

      this.customTemplate()?.createComponent(request.component, { injector: innerInjector });
    }

    this.visible.set(true);
    this.cdr.markForCheck();
  }

  protected handleHide(): void {
    this.currentDialogRef?.close();
    this.customTemplate()?.clear();
    this.activeConfig.set(undefined);
    this.currentDialogRef = null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
