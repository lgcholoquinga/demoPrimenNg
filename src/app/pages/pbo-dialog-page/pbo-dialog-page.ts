import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { DemoCard } from '../../components/demo-card/demo-card';
import { IActionDialog, PboDialog } from '../../components/pbo-dialog/pbo-dialog';
import { DialogBase } from '../../services/dialog.service';

@Component({
  selector: 'pbo-dialog-page',
  imports: [PboDialog, ButtonModule],
  templateUrl: './pbo-dialog-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PboDialogPage {
  private readonly dialogData = inject(DialogBase);
  private readonly destroyRef = inject(DestroyRef);
  public visible = signal(false);
  public visible2 = signal(false);

  public optionsDialog: IActionDialog = {
    label: 'Button',
    color: 'red',
    closable: true,
    action: 'action_button',
  };

  public optionsDialog2: IActionDialog[] = [
    {
      label: 'Cancel',
      color: 'red',
      closable: true,
    },
    {
      label: 'Save',
      color: 'red',
      action: 'action_save',
    },
  ];

  public openDemoCard(): void {
    this.dialogData.show(DemoCard);
  }

  public openDemo(): void {
    this.dialogData.show({
      title: 'Dialog Title',
      description: 'Dialog Description',
      question: 'Dialog Question',
      actions: [
        { label: 'Cancel', color: 'secondary', closable: true },
        { label: 'Save', color: 'primary', action: 'save' },
      ],
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((action) => {
      console.log('Action:', action);
    });
  }
}
