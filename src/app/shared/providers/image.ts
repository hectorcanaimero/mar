import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Observable } from 'rxjs';

const { Camera } = Plugins;

@Injectable()

export class ImageProvider {

    private _READER: any =	new FileReader();
    private _IMAGE : SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {  }

    takePicture = async() => {
        const image  	= await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera
        });
        this._IMAGE = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.webPath));
        return this._IMAGE;
    }

    selectPhoto = async() => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri
        });
        return image.webPath;
    }

    selectImage = (event) : Observable<any> => {
        return Observable.create((observer) => {
            this.handleImageSelection(event).subscribe((res) => {      
                observer.next(res);
                observer.complete();   
            });
        });
    }

    handleImageSelection = (event : any) : Observable<any> => {
        let file : any = event.target.files[0];
        this._READER.readAsDataURL(file);
        return Observable.create((observer) =>
        {
            this._READER.onloadend = () => {
                observer.next(this._READER.result);
                observer.complete();
            }
        });
    }

}