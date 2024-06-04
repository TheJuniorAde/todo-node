import { Component, Input, OnInit } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { FormComponent, TodoEntity } from "../form/form.component"
import { SpinnerOverlayService } from "../spinner-overlay/spinner-overlay.service"
import { TodoService } from "../todo.service"

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  all: TodoEntity[] = []
  pending: TodoEntity[] = []
  finished: TodoEntity[] = []

  notPending = false
  notFinished = false

  @Input("ngModel")
  selectedOption: any = null

  constructor(
    public dialog: MatDialog,
    private spinner: SpinnerOverlayService,
    public apiService: TodoService
  ) {}

  ngOnInit(): void {
    this.listAll()
  }

  onChange() {
    if (this.selectedOption && this.selectedOption[0]) {
      const item = this.all.find(
        (curItem) => curItem.id === this.selectedOption[0]
      )

      if (!!item) {
        this.notPending = item.status === "finished"
        this.notFinished = !this.notPending
      }
    }
  }

  async markAs(status: TodoEntity["status"]) {
    if (this.selectedOption && this.selectedOption[0]) {
      const item = this.all.find(
        (curItem) => curItem.id === this.selectedOption[0]
      )

      if (!!item) {
        await this.apiService.update({ ...item, status }, this.spinner)
        this.listAll()
      }
    }
  }

  async delete() {
    if (this.selectedOption && this.selectedOption[0]) {
      const item = this.all.find(
        (curItem) => curItem.id === this.selectedOption[0]
      )

      if (!!item) {
        await this.apiService.delete(item, this.spinner)
        this.listAll()
      }
    }
  }

  async listAll() {
    this.selectedOption = null
    const { result } = await this.apiService.listAll(this.spinner)
    this.all = result
    this.tasksByStatus()
  }

  tasksByStatus() {
    this.pending = this.all.filter((item) => item.status === "pending")
    this.finished = this.all.filter((item) => item.status === "finished")
  }

  openDialog(toEdit = true): void {
    if (!this.selectedOption && toEdit) {
      return
    }

    const item = toEdit
      ? this.all.find((curItem) => curItem.id === this.selectedOption[0])
      : undefined

    if (!item && toEdit) {
      return
    }

    const data: TodoEntity = toEdit
      ? item!
      : { id: 0, name: "", status: "pending" }

    const dialogRef = this.dialog.open(FormComponent, {
      width: "300px",
      data: { ...data, edit: toEdit },
    })

    dialogRef.afterClosed().subscribe(async (result?: TodoEntity) => {
      if (result) {
        if (result.id && result.id !== 0) {
          await this.apiService.update(result, this.spinner)
        } else {
          await this.apiService.add(result, this.spinner)
        }
        await this.listAll()
      }
    })
  }
}
