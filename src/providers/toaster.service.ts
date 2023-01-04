import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    private readonly success = 'success';
    private readonly danger = 'danger';

    constructor(private toastController: ToastController) { }

    public async getSuccessToast(text): Promise<HTMLIonToastElement> {
        return await this.getToast(text, this.success);
    }

    public async getDangerToast(text): Promise<HTMLIonToastElement> {
        return await this.getToast(text, this.danger);
    }

    private async getToast(text, color): Promise<HTMLIonToastElement> {
        return await this.toastController.create({
            message: text,
            position: 'top',
            duration: 1500,
            color
        });
    }
}
