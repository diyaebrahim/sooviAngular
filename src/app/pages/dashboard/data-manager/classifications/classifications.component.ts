import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DataManagerService } from '../../../../@core/app-services/datamanager.service';
import { ToasterHelper } from '../../../../@core/app-services/toasterHelper';
import { Classification } from '../../../../@core/models/classification';



@Component({
  selector: 'ngx-classifications',
  templateUrl: './classifications.component.html',
  styleUrls: ['./classifications.component.scss']
})
export class ClassificationsComponent  {
  classifications: Classification[] = new Array();
  selectedClassification: Classification = new Classification();
  gettingclassifications: boolean = true;
  savingClassification: boolean = false;
  constructor(
    private dataManger: DataManagerService,
    private toasterHelper: ToasterHelper,
    private dialogService: NbDialogService
  ) {
    this.getclassifications();
  }
  getclassifications() {
    this.dataManger.getClassifications().subscribe((data) => {
      this.classifications = data;
      this.gettingclassifications = false;
    });
  }
  addOrUpdateClassification(ref) {
    this.savingClassification = true;
    this.dataManger.addOrUpdateClassification(this.selectedClassification).subscribe((data) => {
      if (data.isSucceed) {
        this.toasterHelper.showSaved(data.message);
        this.selectedClassification = data.responseObject;
        this.getclassifications();
        ref.close();
      } else {
        this.toasterHelper.showError(data.message);
      }
      this.savingClassification = false;
    });
  }
  addClassification(dialog: TemplateRef<any>) {
    this.selectedClassification = new Classification();
    this.selectedClassification.id = 0;
    this.dialogService.open(dialog);
  }
  editClassification(dialog: TemplateRef<any>, Classification: Classification) {
    this.selectedClassification = Classification;
    this.dialogService.open(dialog);
  }
  uploadFile(files){
    if(files.length != 0){
      this.selectedClassification.image = files[0];
    }
  }
}
