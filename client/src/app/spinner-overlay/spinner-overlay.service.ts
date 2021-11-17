import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponent } from './spinner-overlay.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerOverlayService {
  private overlayRef: OverlayRef | null = null;
  private spinnerOverlayPortal: ComponentPortal<SpinnerOverlayComponent> | null =
    null;

  constructor(private overlay: Overlay) {}

  public show(message = '') {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    this.spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);
    this.overlayRef.attach(this.spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
  }

  public hide() {
    if (!!this.overlayRef) {
      this.overlayRef.detach();
      console.log('trying to hide1', this);
    }
  }
}
