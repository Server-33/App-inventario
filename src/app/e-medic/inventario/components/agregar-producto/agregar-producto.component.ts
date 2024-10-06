import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, Input, inject } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

// Iconos ->
import { IconRocket } from "../../../../shared/ui/icons/rocket";
import { IconBack } from "../../../../shared/ui/icons/back";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { EMedic, EmedicForm } from "../../models/EMedic.model";
import { InventarioService } from "../../services/inventario.service";

export interface CreateForm {
  nombre?: FormControl<string>;
  categoria?: FormControl<string>;
  cantidad?: FormControl<number>;
  precio?: FormControl<number>;
  descripcion?: FormControl<string>;
  fecha_agregado?: FormControl<string>;
  proveedor?: FormControl<string>;
}

@Component({
  selector: "app-agregar-producto",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconBack,
    IconRocket,
    RouterLink,
  ],
  templateUrl: "./agregar-producto.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AgregarProductoComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;
  private _inventarioService = inject(InventarioService);
  private _router = inject(Router);
  private _productoId: any = "";
  private _cdr = inject(ChangeDetectorRef);

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this._productoId = params.get("productoId");
    });
    this.setFormValues(this._productoId);
    this._cdr.detectChanges();
  }

  get productoId(): string {
    return this._productoId;
  }


  form = this._formBuilder.group<CreateForm>({
    nombre: this._formBuilder.control("", Validators.required),
    categoria: this._formBuilder.control("", [Validators.required]),
    cantidad: this._formBuilder.control(0),
    precio: this._formBuilder.control(0),
    descripcion: this._formBuilder.control(""),
    fecha_agregado: this._formBuilder.control(""),
    proveedor: this._formBuilder.control(""),
  });

  //CREAR O EDITAR
  async createProducto() {
    if (this.form.invalid) return;

    try {
      const producto = this.form.value as EmedicForm;
      !this._productoId
        ? await this._inventarioService.createProducto(producto)
        : await this._inventarioService.updateProducto(this._productoId, producto );
      this._router.navigateByUrl("/medic");
    } catch (error) {
      return console.log(error);
    }
  }

  // SET VALORES A EDITAR
  async setFormValues(id: string) {
    try {
      const producto = await this._inventarioService.getProducto(id);

      if (!producto) return;

      this.form.setValue({
        nombre: producto.nombre,
        categoria: producto.categoria,
        cantidad: producto.cantidad,
        precio: producto.precio,
        descripcion: producto.descripcion,
        proveedor: producto.proveedor,
        fecha_agregado: producto.fecha_agregado,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
