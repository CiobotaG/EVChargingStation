import { Component, Input} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-deleteconfirmation',
  templateUrl: './deleteconfirmation.component.html',
  styleUrls: ['./deleteconfirmation.component.css']
})
export class DeleteconfirmationComponent {

  @Input() message: string = "";

  constructor(
    public dialogRef: MatDialogRef<DeleteconfirmationComponent>
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onClickSubmit() {
    this.dialogRef.close(true);
  }
}
