import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs/internal/observable/of';
import { InventarioService } from "../../services/inventario.service";
import { EMedic } from "../../models/EMedic.model";

@Component({
  selector: "app-listado-productos",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./listado-productos.component.html",
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListadoProductosComponent implements OnInit {
  private _router = inject(Router);
  private _inventarioService = inject(InventarioService);
  private _cdr = inject(ChangeDetectorRef);

  stock = this._inventarioService.getEquipoMedico();
  inventario_list: EMedic[] = [];

  ngOnInit(): void {
    this.stock.subscribe({
      next: (data) => {
        this.inventario_list = data;
        this._cdr.detectChanges();
        // console.log('Datos del inventario :>> ', data);
      },
      error: (err) => {
        console.error('Error al obtener datos del inventario:', err);
      }
    });
  }

  editProducto(producto: EMedic) {
    this._router.navigate(['/edit', producto.id]);
  }

  async deleteContact(producto: EMedic) {
    let id = producto.id;
    try {
      await this._inventarioService.deleteproducto(id)
    } catch (error) {
    }
  }

}


