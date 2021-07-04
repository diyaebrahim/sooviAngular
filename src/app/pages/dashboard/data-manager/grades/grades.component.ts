import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { DataManagerService } from '../../../../@core/app-services/datamanager.service';
import { ToasterHelper } from '../../../../@core/app-services/toasterHelper';
import { Grade } from '../../../../@core/models/grade';

@Component({
  selector: 'ngx-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent {
  grades: Grade[] = new Array();
  selectedGrade: Grade = new Grade();
  gettingGrades: boolean = true;
  savingGrade: boolean = false;
  constructor(
    private dataManger: DataManagerService,
    private toasterHelper: ToasterHelper,
    private dialogService: NbDialogService
  ) {
    this.getGrades();
  }
  getGrades() {
    this.dataManger.getGrades().subscribe((data) => {
      this.grades = data;
      this.gettingGrades = false;
    });
  }
  addOrUpdateGrade(ref) {
    this.savingGrade = true;
    this.dataManger.addOrUpdateGrade(this.selectedGrade).subscribe((data) => {
      if (data.isSucceed) {
        this.toasterHelper.showSaved(data.message);
        this.selectedGrade = data.responseObject;
        this.getGrades();
        ref.close();
      } else {
        this.toasterHelper.showError(data.message);
      }
      this.savingGrade = false;
    });
  }
  addGrade(dialog: TemplateRef<any>) {
    this.selectedGrade = new Grade();
    this.selectedGrade.id = 0;
    this.dialogService.open(dialog);
  }
  editGrade(dialog: TemplateRef<any>, Grade: Grade) {
    this.selectedGrade = Grade;
    this.dialogService.open(dialog);
  }
  uploadFile(files){
    if(files.length != 0){
      this.selectedGrade.image = files[0];
    }
  }
}
