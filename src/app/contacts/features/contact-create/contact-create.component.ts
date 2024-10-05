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
import { ContactsService } from '../../data-access/contacts.service';
import { ContactForm } from '../../shared/interfaces/contacts.interface';

export interface CreateForm {
  fullName: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  description?: FormControl<string | undefined>;
}

@Component({
  selector: 'app-contact-create',
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[600px] m-auto mt-3 ">
      <form [formGroup]="form" (ngSubmit)="createContact()">
        <div class="mb-8">
          <label for="first_name" class="block mb-2 text-sm font-medium"
            >Nombre</label
          >
          <input
            type="text"
            id="first_name"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Usuario Kyclops"
            formControlName="fullName"
          />
        </div>
        <div class="mb-8">
          <label for="email" class="block mb-2 text-sm font-medium"
            >Correo</label
          >
          <input
            type="text"
            id="email"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="example@mail.com"
            formControlName="email"
          />
        </div>
        <div class="mb-8">
          <label for="phoneNumber" class="block mb-2 text-sm font-medium"
            >Telefono contacto</label
          >
          <input
            type="text"
            id="phoneNumber"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="+51 995123233"
            formControlName="phoneNumber"
          />
        </div>
        <div class="mb-8">
          <label for="description" class="block mb-2 text-sm font-medium"
            >Comentarios (optional)</label
          >
          <textarea
            rows="5"
            type="text"
            id="description"
            class="w-full p-3 rounded-md text-sm bg-transparent border-gray-500 border"
            placeholder="Cuentanos sobre ti"
            formControlName="description"
          ></textarea>
        </div>

        <div class="flex justify-between items-center">
          <a
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-red-400 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            routerLink="/usuarios"
          >
            <app-icon-back />
            Regresar
          </a>

          <button
            class="text-sm flex text-nowrap items-center gap-x-2 hover:text-green-300 transition-[color] ease-in-out duration-200 p-4 cursor-pointer"
            type="submit"
          >
            <app-icon-rocket />
            @if (contactId) { Editar usuario } @else { Crear nuevo usuario }
          </button>
        </div>
      </form>
    </div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, IconRocket, IconBack, RouterLink],
})
export default class ContactCreateComponent {
  private _formBuilder = inject(FormBuilder).nonNullable;

  private _contactService = inject(ContactsService);

  private _router = inject(Router);

  private _contactId = '';

  get contactId(): string {
    return this._contactId;
  }

  @Input() set contactId(value: string) {
    this._contactId = value;
    this.setFormValues(this._contactId);
  }

  form = this._formBuilder.group<CreateForm>({
    fullName: this._formBuilder.control('', Validators.required),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    phoneNumber: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control(''),
  });

  //CREAR O EDITAR
  async createContact() {
    if (this.form.invalid) return;

    try {
      const contact = this.form.value as ContactForm;
      !this.contactId
        ? await this._contactService.createContact(contact)
        : await this._contactService.updateContact(this.contactId, contact);
      this._router.navigateByUrl('/usuarios');
    } catch (error) {
      return console.log(error);
    }
  }

  // SET VALORES A EDITAR
  async setFormValues(id: string) {
    try {
      const contact = await this._contactService.getContact(id);

      if (!contact) return;

      this.form.setValue({
        fullName: contact.fullName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        description: contact.description,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
