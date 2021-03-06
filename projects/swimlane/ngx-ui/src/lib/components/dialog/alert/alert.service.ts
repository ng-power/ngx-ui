import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InjectionService } from '../../../services/injection.service';
import { OverlayService } from '../../overlay/overlay.service';
import { DialogService } from '../dialog.service';
import { AlertComponent } from './alert.component';
import { AlertTypes } from './alert.types';

@Injectable()
export class AlertService extends DialogService<AlertComponent> {
  defaults: any = {
    inputs: {
      zIndex: 991,
      closeOnBlur: false,
      closeOnEscape: false,
      closeButton: false,
      showOverlay: true,
      visible: true
    }
  };

  type: any = AlertComponent;

  clsMap: any = {
    danger: 'ngx-alert-danger',
    warning: 'ngx-alert-warning',
    info: 'ngx-alert-info'
  };

  constructor(injectionService: InjectionService, overlayService: OverlayService) {
    super(injectionService, overlayService);
  }

  alert(props): any {
    return this.createDialog(props, AlertTypes.alert);
  }

  confirm(props): any {
    return this.createDialog(props, AlertTypes.confirm);
  }

  prompt(props): any {
    return this.createDialog(props, AlertTypes.prompt);
  }

  private createDialog(props: any, type: AlertTypes): any {
    const subject = new Subject();
    const { title, content, longPress } = props;
    const cssClass = 'ngx-alert-dialog ' + this.clsMap[props.style];

    const component = this.create({
      title,
      content,
      longPress,
      type,
      cssClass
    });

    const list = component.instance.ok.subscribe(data => {
      subject.next({
        type: 'ok',
        data
      });

      subject.complete();
      list.unsubscribe();
      list2.unsubscribe();
    });

    const list2 = component.instance.cancel.subscribe(data => {
      subject.next({
        type: 'cancel',
        data
      });

      subject.complete();
      list.unsubscribe();
      list2.unsubscribe();
    });

    return subject;
  }
}
