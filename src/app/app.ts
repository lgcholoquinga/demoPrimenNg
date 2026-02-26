import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LgcDynamicDialog } from './components/lgc-dynamic-dialog/lgc-dynamic-dialog';

@Component({
  selector: 'lgc-root',
  imports: [RouterOutlet, LgcDynamicDialog],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
