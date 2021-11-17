import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent, TodoEntity } from '../form/form.component';
import { SpinnerOverlayService } from '../spinner-overlay/spinner-overlay.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  all: { id: number; name: string; status: 'pending' | 'finished' }[] = [];
  pending: { id: number; name: string; status: 'pending' | 'finished' }[] = [];
  finished: { id: number; name: string; status: 'pending' | 'finished' }[] = [];

  notPending = false;
  notFinished = false;

  @Input('ngModel')
  selectedOption: any = null;

  constructor(
    public dialog: MatDialog,
    private spinner: SpinnerOverlayService,
    public apiService: TodoService
  ) {}

  ngOnInit(): void {
    this.listAll();
  }

  onChange() {
    if (this.selectedOption && this.selectedOption[0]) {
      const index = this.all.findIndex(
        (item) => item.id === this.selectedOption[0]
      );

      if (index !== -1) {
        this.notPending = this.all[index].status === 'finished';
        this.notFinished = !this.notPending;
      }
    }
  }

  async markAs(status: TodoEntity['status']) {
    if (this.selectedOption && this.selectedOption[0]) {
      const index = this.all.findIndex(
        (item) => item.id === this.selectedOption[0]
      );

      if (index !== -1) {
        await this.apiService.update(
          { ...this.all[index], status },
          this.spinner
        );
        this.listAll();
      }
    }
  }

  async delete() {
    if (this.selectedOption && this.selectedOption[0]) {
      const index = this.all.findIndex(
        (item) => item.id === this.selectedOption[0]
      );

      if (index !== -1) {
        await this.apiService.delete(this.all[index], this.spinner);
        this.listAll();
      }
    }
  }

  async listAll() {
    this.selectedOption = null;
    const result = await this.apiService.listAll(this.spinner);
    this.all = result.data;
    this.tasksByStatus();
  }

  tasksByStatus() {
    this.pending = this.all.filter((item) => item.status === 'pending');
    this.finished = this.all.filter((item) => item.status === 'finished');
  }

  openDialog(toEdit = true): void {
    console.log('chegou aqui??');
    if (!this.selectedOption && toEdit) {
      return;
    }

    const index = toEdit
      ? this.all.findIndex((item) => item.id === this.selectedOption[0])
      : -1;

    if (index === -1 && toEdit) {
      return;
    }

    const data: TodoEntity = toEdit
      ? this.all[index]
      : { id: 0, name: '', status: 'pending' };
    const dialogRef = this.dialog.open(FormComponent, {
      width: '300px',
      data: { ...data, edit: toEdit },
    });

    dialogRef.afterClosed().subscribe(async (result?: TodoEntity) => {
      if (result) {
        if (result.id && result.id !== 0) {
          await this.apiService.update(result, this.spinner);
        } else {
          await this.apiService.add(result, this.spinner);
        }
        await this.listAll();
      }
    });
  }
}
