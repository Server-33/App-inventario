import { Component, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { IconRocket } from '../../../shared/ui/icons/rocket';
import { IconBack } from '../../../shared/ui/icons/back';
import { SociosService } from '../../data/socios.service';
import { Socio, SocioForm } from '../../interfaces/socio.interface';

export interface CreateForm {
  name?: FormControl<string>;
  title?: FormControl<string>;
  subtitle?: FormControl<string>;
  coment?: FormControl<string>;
  description?: FormControl<string | undefined>;
  social?: FormControl<[]>;
}

@Component({
  selector: 'app-socio-create',
  template: `
    <div class="px-2 xl:px-0 w-full max-w-[600px] m-auto mt-3 ">
      <form [formGroup]="form" (ngSubmit)="createSocio()">
        <div class="mb-8">
          <label for="name" class="block mb-2 text-sm font-medium"
            >Titulo</label
          >
          <input
            type="text"
            id="name"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Nuevo socio.."
            formControlName="name"
          />
        </div>
        <div class="row flex gap-4 items-center">
          <div class="mb-8">
            <label for="title" class="block mb-2 text-sm font-medium"
              >Titulo</label
            >
            <input
              type="text"
              id="title"
              class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
              placeholder="Titulo principal"
              formControlName="title"
            />
          </div>
          <div class="mb-8">
            <label for="subtitle" class="block mb-2 text-sm font-medium"
              >Subtitulo</label
            >
            <input
              type="text"
              id="subtitle"
              class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
              placeholder="Subtitulo"
              formControlName="subtitle"
            />
          </div>
          <div class="mb-8">
            <label for="coment" class="block mb-2 text-sm font-medium"
              >Comentario CTA</label
            >
            <input
              type="text"
              id="coment"
              class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
              placeholder="Call to acction"
              formControlName="coment"
            />
          </div>
        </div>
        <div class="mb-8">
          <label for="social" class="block mb-2 text-sm font-medium"
            >Telefono <span class="text-xs  "> ( whatsapp )</span>
          </label>
          <input
            type="text"
            id="social"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="+51 995123233"
          />
        </div>
        <div class="mb-8">
          <label for="description" class="block mb-2 text-sm font-medium"
            >Descripción</label
          >
          <textarea
            rows="5"
            type="text"
            id="description"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Información de descripción"
            formControlName="description"
          ></textarea>
        </div>

        <!-- //BOTONES -->
        <div class="flex justify-between items-center">
          <a
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-red-400 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            routerLink="/socios"
          >
            <app-icon-back />
            Regresar
          </a>

          <button
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-green-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            type="submit"
          >
            <app-icon-rocket />
            @if (socioId) { Editar usuario } @else { Crear nuevo usuario }
          </button>
        </div>
      </form>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, IconRocket, IconBack, RouterLink],
})
export default class SociosCreateComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;
  private _socioService = inject(SociosService);
  private _router = inject(Router);
  private _socioId = '';

  get socioId(): string {
    return this._socioId;
  }

  @Input() set socioId(value: string) {
    this._socioId = value;
    this.setFormValues(this._socioId);
  }

  form = this._formBuilder.group<CreateForm>({
    name: this._formBuilder.control('', Validators.required),
    title: this._formBuilder.control('', [Validators.required]),
    subtitle: this._formBuilder.control(''),
    coment: this._formBuilder.control(''),
    description: this._formBuilder.control(''),
    // social: this._formBuilder.control([]),
  });

  //CREAR O EDITAR
  async createSocio() {
    if (this.form.invalid) return;

    try {
      const socio = this.form.value as SocioForm;
      !this._socioId
        ? await this._socioService.createContact(socio)
        : await this._socioService.updateContact(this._socioId, socio);
      this._router.navigateByUrl('/socios');
    } catch (error) {
      return console.log(error);
    }
  }

  // SET VALORES A EDITAR
  async setFormValues(id: string) {
    try {
      const socio = await this._socioService.getContact(id);

      if (!socio) return;

      this.form.setValue({
        name: socio.name,
        title: socio.title,
        // subtitle: socio.subtitle,
        // description: socio.description,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
