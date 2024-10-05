import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-listado-productos',
    standalone: true,
    imports: [
    CommonModule,
],
    templateUrl: './listado-productos.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListadoProductosComponent { }
