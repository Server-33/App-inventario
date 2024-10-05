import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Socio } from '../../interfaces/socio.interface';

@Component({
  selector: 'app-card-socio',
  standalone: true,
  template: `
    <div class="border border-gray-500/50 rounded-md p-3 flex flex-row gap-x-4">
      <div class="flex-4">
        <h4 class="text-red-700/75 mb-2 text-xl  font-bold">
          {{ socio.name }}
        </h4>
        <small class="text-gray-400 tracking-widest  mb-2">{{
          socio.coment
        }}</small>
        <p class="text-gray-600/85 tracking-widest mb-2">
          {{ socio.description }}
        </p>
        <!-- <p class="text-gray-400 text-sm">
          {{ !socio.description ? 'Descripción...' : socio.description }}
        </p>
        <p class="text-red-400 text-base">
          {{ socio.acordion![0].title }}
        </p> -->
      </div>
      <div>
        <app-menu
          (onEditContact)="onEditSocio(socio)"
          (onDeleteContact)="onDeleteSocio(socio)"
        />
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MenuComponent],
})
export class CardSocioComponent {
  @Input({ required: true }) socio!: Socio;

  @Output() editSocio = new EventEmitter<Socio>();

  @Output() deleteSocio = new EventEmitter<string>();

  onEditSocio(socio: Socio) {
    this.editSocio.emit(socio);
  }

  onDeleteSocio(socio: Socio) {
    this.deleteSocio.emit(socio.id);
  }
}
