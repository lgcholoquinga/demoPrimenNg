import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LgcDialog } from '../../components';
import { DialogService } from '../../services/dialog/dialog.service';
import { DialogDetailComponent } from './dialog-detail';

@Component({
  selector: 'lgc-dialog-page',
  imports: [ButtonModule, LgcDialog],
  templateUrl: './dialog-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DialogPage {
  private readonly dialogService = inject(DialogService);

  protected readonly simpleVisible = signal(false);
  protected readonly footerVisible = signal(false);
  protected readonly maximizableVisible = signal(false);

  protected readonly log = signal<string[]>([]);
  private logCount = 0;

  protected addLog(msg: string): void {
    this.logCount++;
    this.log.update((entries) => [`${this.logCount}. ${msg}`, ...entries]);
  }

  protected openConfigOnly(): void {
    const ref = this.dialogService.open({
      header: 'Aviso',
      modal: true,
      closable: true,
    });
    ref.afterClosed$.subscribe(() => this.addLog('Config-only: cerrado'));
  }

  protected openWithComponent(): void {
    const ref = this.dialogService.open(DialogDetailComponent, {
      header: 'Detalle del registro',
      modal: true,
      data: { id: 42, name: 'Angular Demo' },
    });
    ref.afterClosed$.subscribe((result) =>
      this.addLog(`Dynamic component: cerrado con resultado → "${result ?? 'undefined'}"`),
    );
  }
}
