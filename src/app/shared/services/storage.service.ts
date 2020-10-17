import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: AngularFireStorage) {}

    //Tarea para subir archivo
    tareaCloudStorage = (nombreArchivo: string, datos: any) => this.storage.upload(nombreArchivo, datos);

    //Referencia del archivo
    public referenciaCloudStorage = (nombreArchivo: string) => this.storage.ref(nombreArchivo);

}