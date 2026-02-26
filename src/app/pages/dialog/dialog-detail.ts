import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogRef } from '../../services/dialog/dialog-ref';
import { DIALOG_DATA } from '../../services/dialog/dialog.tokens';

export interface DetailData {
  id: number;
  name: string;
}

@Component({
  selector: 'lgc-dialog-detail',
  imports: [ButtonModule],
  template: `
    <div class="flex flex-col gap-4">
      <dl class="text-sm grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
        <dt class="font-semibold">ID</dt>
        <dd>{{ data.id }}</dd>
        <dt class="font-semibold">Nombre</dt>
        <dd>{{ data.name }}</dd>
      </dl>
      <div class="flex justify-end gap-2 pt-2 border-t border-gray-200">
        <p-button label="Cancelar" severity="secondary" (click)="dialogRef.close()" />
        <p-button label="Confirmar" (click)="dialogRef.close('confirmed')" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDetailComponent {
  readonly data = inject<DetailData>(DIALOG_DATA);
  readonly dialogRef = inject(DialogRef);
}
