import { Injectable } from "@angular/core";
import { NbComponentStatus, NbToastrService } from "@nebular/theme";
@Injectable({
  providedIn: "root",
})
export class ToasterHelper {
  constructor(private toastrService: NbToastrService) {}

  showToast(title: string, body: string, status: NbComponentStatus) {
    this.toastrService.show(body, title, { status: status, duration: 5000 });
  }
  showSaved(body: string) {
    this.toastrService.show(body, 'Saved successfully', { status: 'primary', duration: 5000 });
  }
  showAdded(body: string) {
    this.toastrService.show(body, 'Added successfully', { status: 'primary', duration: 5000 });
  }
  showError(body: string) {
    this.toastrService.show(body, 'Error was occurred', { status: 'danger', duration: 5000 });
  }
}
