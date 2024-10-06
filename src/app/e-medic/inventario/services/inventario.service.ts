import { inject, Injectable } from "@angular/core";
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
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { EMedic, EmedicForm } from "../models/EMedic.model";

const PATH = "equipo_medico";
@Injectable({
  providedIn: "root",
})
export class InventarioService {
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
  let contacts: EMedic[] = [];
  querySnapshot.forEach((doc) => {
    contacts = [...contacts, { id: doc.id, ...doc.data() } as EMedic]
  });
  return contacts;
}

  // TRAER PRODUCTOS
  getEquipoMedico() {
    return collectionData(this._collection, { idField: "id" }) as Observable<
      EMedic[]
    >;
  }

  // TRAER Producto POR ID
  async getProducto(id: string) {
    try {
      const document = doc(this._firestore, PATH, id);
      const snapshot = await getDoc(document);
      return snapshot.data() as EmedicForm;
    } catch (error) {
      return undefined;
    }
  }

  // CREAR productos
  createProducto(producto: EmedicForm) {
    return addDoc(this._collection, producto);
  }

  // ACTUALIZAR PRODUCTO
  updateProducto(id: string, producto: EmedicForm) {
    const document = doc(this._firestore, PATH, id);
    return updateDoc(document, { ...producto });
  }

  // ELIMINAR PRODUCTO
  deleteproducto(id: string) {
    const document = doc(this._firestore, PATH, id);
    return deleteDoc(document);
  }

}
