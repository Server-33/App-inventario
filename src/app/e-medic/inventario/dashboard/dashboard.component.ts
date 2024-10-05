import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListadoProductosComponent } from "../components/listado-productos/listado-productos.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
    CommonModule,
    ListadoProductosComponent
],
    template: `
    <app-listado-productos/>
    `,
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent { }
