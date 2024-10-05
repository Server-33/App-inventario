import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardContactComponent } from '../../ui/card-contact/card-contact.component';
import { Contact } from '../../shared/interfaces/contacts.interface';
import { SearchBarComponent } from '../../ui/search-bar/search-bar.component';
import { AsyncPipe } from '@angular/common';
import { ContactsService } from '../../data-access/contacts.service';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-contact-dashboard',
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[1200px] m-auto">
      <app-search-bar (changeQuery)="changeQuery($event)" />
      <section class="grid grid-cols-3 gap-8 mt-8">
        @for (contact of contacts$ | async ; track contact.id) {
          <app-card-contact
            [contact]="contact"
            (deleteContact)="deleteContact($event)"
            (editContact)="editContact($event)"
          />
        }
      </section>
    </div>
  `,
  standalone: true,
  imports: [CardContactComponent, SearchBarComponent, AsyncPipe],
})
export default class ContactDashboardComponent  {

  private _router = inject(Router);
  private _contactService = inject(ContactsService)

  contacts$ = this._contactService.getContacts();

  constructor(){
    console.log('desde contruc :>> ', this.contacts$);
  }

  async deleteContact(id: string) {
    try {
      await this._contactService.deleteContact(id)
    } catch (error) {
    }
  }

  editContact(contact: Contact) {
    this._router.navigate(['/usuarios/edit', contact.id]);
  }

  async changeQuery(query: string) {
    try {
      const contacts = await this._contactService.filter(query)
      this.contacts$ = of(contacts);
    } catch (error) {

    }
  }
}
