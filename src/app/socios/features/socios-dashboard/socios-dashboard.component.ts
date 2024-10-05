import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Router } from '@angular/router';
import { SociosService } from '../../data/socios.service';
import { Contact } from '../../../contacts/shared/interfaces/contacts.interface';
import { of } from 'rxjs';
import { CardSocioComponent } from '../../components/card-socio/card-socio.component';
import { Socio } from '../../interfaces/socio.interface';

@Component({
  selector: 'app-socios-dashboard',
  template: `
    <div class="px-4 xl:px-0 w-full max-w-[1200px] m-auto">
      <app-search-bar (changeQuery)="changeQuery($event)" />
      <section class="grid grid-cols-1 gap-8 mt-8">
        @for (socio of socio$ | async ; track socio.id) {
        <app-card-socio
          [socio]="socio"
          (deleteSocio)="deleteSocio($event)"
          (editSocio)="editSocio($event)"
        />
        }
      </section>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, SearchBarComponent, CardSocioComponent],
})
export default class SociosDashboardComponent {
  private _router = inject(Router);
  private _socioService = inject(SociosService);

  socio$ = this._socioService.getSocios();

  socios: Socio[] = [];

  async deleteSocio(id: string) {
    try {
      await this._socioService.deleteContact(id);
    } catch (error) {}
  }

  editSocio(socio: Socio) {
    this._router.navigate(['/usuarios/edit', socio.id]);
  }

  async changeQuery(query: string) {
    try {
      const contacts = await this._socioService.filter(query);
      this.socio$ = of(contacts);
    } catch (error) {}
  }
}
