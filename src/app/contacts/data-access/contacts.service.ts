import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contact, ContactForm } from '../shared/interfaces/contacts.interface';


const PATH = 'contacts'

@Injectable({
  providedIn: 'root',
})
export class ContactsService {

  private _firestore = inject(Firestore)
  private _collection = collection(this._firestore, PATH)



  //FILTRO
  async filter(name: string) {
    const q = query(
      this._collection,
      where('fullName', '>=', name),
      where('fullName', '<=', name + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    let contacts: Contact[] = [];
    querySnapshot.forEach((doc) => {
      contacts = [...contacts, { id: doc.id, ...doc.data() } as Contact]
    });
    return contacts;
  }


  // TRAER LOS CONTACTOS
  getContacts() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<Contact[]>;
  }

  // TRAER CONTACT POR ID
  async getContact(id: string) {
    try {
      const document = doc(this._firestore, PATH, id);
      const snapshot = await getDoc(document);
      return snapshot.data() as ContactForm;
    } catch (error) {
      return undefined;
    }
  }


  // CREAR CONTACTO
  createContact(contact: ContactForm) {
    return addDoc(this._collection, contact)
  }

  // ACTUALIZAR CONTACTO
  updateContact(id: string, contact: ContactForm) {
    const document = doc(this._firestore, PATH, id)
    return updateDoc(document, { ...contact })
  }


  // ELIMINAR CONTACTO
  deleteContact(id: string) {
    const document = doc(this._firestore, PATH, id)
    return deleteDoc(document)
  }

}
