import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lgc-demo-card',
  imports: [],
  template: `<h2 class="text-2xl font-bold text-purple-900 text-center">Demo Card</h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoCard {}
