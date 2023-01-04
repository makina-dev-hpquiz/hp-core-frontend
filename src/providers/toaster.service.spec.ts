import { TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { ToasterService } from './toaster.service';

//Méthode privée
const getToast = 'getToast';

//Propriété privée
const success = 'success';
const danger = 'danger';

describe('ToasterService', () => {
    let service: ToasterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers:[
            {
              provide: ToastController,
              useValue: new ToastController()
            },
          ]

        });
        service = TestBed.inject(ToasterService);
      });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSuccessToast', async () => {
    const msg = 'Success message';
    const toast = await service.getSuccessToast(msg);

    expect(toast.color).toEqual(success);
    expect(toast.message).toEqual(msg);
  });

  it('getDangerToast', async () => {
    const msg = 'danger message';
    const toast = await service.getDangerToast(msg);

    expect(toast.color).toEqual(danger);
    expect(toast.message).toEqual(msg);
  });

  it('getToast', async () => {
    const msg = 'Message';
    const color = 'primary';

    const toast = await service[getToast](msg, color);

    expect(toast.color).toEqual(color);
    expect(toast.message).toEqual(msg);
  });
});
