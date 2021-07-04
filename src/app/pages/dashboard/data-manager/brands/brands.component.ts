import { Component, TemplateRef } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { DataManagerService } from "../../../../@core/app-services/datamanager.service";
import { ToasterHelper } from "../../../../@core/app-services/toasterHelper";
import { Brand } from "../../../../@core/models/brand";

@Component({
  selector: "ngx-brands",
  templateUrl: "./brands.component.html",
  styleUrls: ["./brands.component.scss"],
})
export class BrandsComponent {
  brands: Brand[] = new Array();
  selectedBrand: Brand = new Brand();
  gettingBrands: boolean = true;
  savingBrand: boolean = false;
  constructor(
    private dataManger: DataManagerService,
    private toasterHelper: ToasterHelper,
    private dialogService: NbDialogService
  ) {
    this.getBrands();
  }
  getBrands() {
    this.dataManger.getBrands().subscribe((data) => {
      this.brands = data;
      this.gettingBrands = false;
    });
  }
  addOrUpdateBrand(ref) {
    this.savingBrand = true;
    this.dataManger.addOrUpdateBrand(this.selectedBrand).subscribe((data) => {
      if (data.isSucceed) {
        this.toasterHelper.showSaved(data.message);
        this.selectedBrand = data.responseObject;
        this.getBrands();
        ref.close();
      } else {
        this.toasterHelper.showError(data.message);
      }
      this.savingBrand = false;
    });
  }
  addBrand(dialog: TemplateRef<any>) {
    this.selectedBrand = new Brand();
    this.selectedBrand.id = 0;
    this.dialogService.open(dialog);
  }
  editBrand(dialog: TemplateRef<any>, brand: Brand) {
    this.selectedBrand = brand;
    this.dialogService.open(dialog);
  }
  uploadFile(files){
    if(files.length != 0){
      this.selectedBrand.image = files[0];
    }
  }
}
