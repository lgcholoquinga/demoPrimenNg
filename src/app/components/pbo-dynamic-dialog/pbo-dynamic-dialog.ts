import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DialogBase } from '../../services/dialog.service';
import { PboDialog } from '../pbo-dialog/pbo-dialog';

@Component({
  selector: 'pbo-dynamic-dialog',
  imports: [PboDialog],
  templateUrl: './pbo-dynamic-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PboDynamicDialog {
  private readonly dialogService = inject(DialogBase);
  private readonly dialogContainer = viewChild('customTemplate', { read: ViewContainerRef });
  private readonly router = inject(Router);

  public get dialog() {
    return this.dialogService;
  }

  public onVisibleChange(visible: boolean): void {
    if (!visible) {
      this.dialogService.close();
    }
  }

  constructor() {
    effect(() => {
      const vcr = this.dialogContainer();
      if (vcr) {
        this.dialogService.register(vcr);
      }
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart),
      takeUntilDestroyed(),
    ).subscribe(() => this.dialogService.close());
  }
}
