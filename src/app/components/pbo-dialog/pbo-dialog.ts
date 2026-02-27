import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

export interface IActionDialog {
  id?: string;
  label: string;
  color: string;
  action?: string;
  closable?: boolean;
}

@Component({
  selector: 'pbo-dialog',
  imports: [DialogModule, ButtonModule],
  templateUrl: './pbo-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PboDialog {
  public icon = input<string>();
  public iconStyleClass = input<string>('');
  public title = input<string>();
  public description = input<string>();
  public question = input<string>();
  public actions = input<IActionDialog[] | IActionDialog>();
  public visible = model<boolean>(false);
  public pboClick = output<string>();
  public pboClose = output<void>();

  public actionsDialog = computed(() => {
    if (this.actions() === undefined) return [];

    if (Array.isArray(this.actions())) {
      return this.getActionsDialog(this.actions() as IActionDialog[]);
    }

    return this.getActionsDialog([this.actions() as IActionDialog]);
  });

  public onHandleClick(action: IActionDialog): void {
    if (action.closable) {
      this.pboClose.emit();
      return;
    }

    this.pboClick.emit(action.action || '');
  }

  private getActionsDialog(actionsialog: IActionDialog[]): IActionDialog[] {
    return actionsialog.map((item) => {
      return {
        id: Math.random().toString(36).substring(2, 9),
        ...item,
      };
    });
  }
}
