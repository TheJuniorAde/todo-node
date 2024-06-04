import { Component, Inject } from "@angular/core"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"

export type ApiResponse<T> = {
  data: T
  success: boolean
  error?: any
}

export type ApiResponseList<T> = {
  result: T[]
  success: boolean
  error?: any
}

export interface TodoEntity {
  id: number
  name: string
  status: "pending" | "finished"
}

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent {
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoEntity
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }
}
