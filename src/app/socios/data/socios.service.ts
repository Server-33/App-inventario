import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Socio, SocioForm } from '../interfaces/socio.interface';

const PATH = 'socios';
@Injectable({
  providedIn: 'root',
})
export class SociosService {
  constructor() {}

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  //FILTRO
  async filter(name: string) {
    const q = query(
      this._collection,
      where('fullName', '>=', name),
      where('fullName', '<=', name + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    let contacts: Socio[] = [];
    querySnapshot.forEach((doc) => {
      contacts = [...contacts, { id: doc.id, ...doc.data() } as Socio];
    });
    return contacts;
  }

  // TRAER SOCIOS
  getSocios() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      Socio[]
    >;
  }

  // TRAER SOCIOS POR ID
  async getContact(id: string) {
    try {
      const document = doc(this._firestore, PATH, id);
      const snapshot = await getDoc(document);
      return snapshot.data() as SocioForm;
    } catch (error) {
      return undefined;
    }
  }

  // CREAR SOCIOS
  createContact(socio: SocioForm) {
    return addDoc(this._collection, socio);
  }

  // ACTUALIZAR SOCIOS
  updateContact(id: string, contact: SocioForm) {
    const document = doc(this._firestore, PATH, id);
    return updateDoc(document, { ...contact });
  }

  // ELIMINAR CONTACTO
  deleteContact(id: string) {
    const document = doc(this._firestore, PATH, id);
    return deleteDoc(document);
  }
}
