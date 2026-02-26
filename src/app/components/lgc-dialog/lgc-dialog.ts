import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  model,
  output,
  TemplateRef,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { DialogPosition } from '../../services/dialog/dialog.tokens';

@Component({
  selector: 'lgc-dialog',
  imports: [Dialog, NgTemplateOutlet],
  templateUrl: './lgc-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LgcDialog {
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

  readonly onShow = output<void>();
  readonly onHide = output<void>();

  readonly footerTpl = contentChild<TemplateRef<void>>('lgcFooter');
  readonly headerTpl = contentChild<TemplateRef<void>>('lgcHeader');
}
