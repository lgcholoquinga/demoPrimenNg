import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PboDynamicDialog } from './components/pbo-dynamic-dialog/pbo-dynamic-dialog';

@Component({
  selector: 'lgc-root',
  imports: [RouterOutlet, PboDynamicDialog],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
