import { Injectable } from '@angular/core';
import { AxiosInstance } from 'axios';
import { environment } from 'src/environments/environment';
import { ApiResponse, TodoEntity } from './form/form.component';
import api from './httpClient';
import { SpinnerOverlayService } from './spinner-overlay/spinner-overlay.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiInstance: AxiosInstance = api({
    host: environment.apiUrl,
  });

  constructor() {}

  async listAll(
    spinner: SpinnerOverlayService
  ): Promise<ApiResponse<TodoEntity[]>> {
    spinner.show('Loading...');

    try {
      const { data } = await this.apiInstance.get<ApiResponse<TodoEntity[]>>(
        '/todo'
      );
      spinner.hide();
      return data;
    } catch (error) {
      spinner.hide();
      return { success: false, error, data: [] };
    }
  }

  async add(
    todoData: TodoEntity,
    spinner: SpinnerOverlayService
  ): Promise<ApiResponse<TodoEntity | null>> {
    spinner.show('Adding...');

    try {
      const { data } = await this.apiInstance.put<
        ApiResponse<TodoEntity | null>
      >('/todo', todoData);
      spinner.hide();
      return data;
    } catch (error) {
      spinner.hide();
      return { success: false, error, data: null };
    }
  }

  async update(
    todoData: TodoEntity,
    spinner: SpinnerOverlayService
  ): Promise<ApiResponse<TodoEntity | null>> {
    spinner.show('Updating...');

    try {
      const { data } = await this.apiInstance.patch<
        ApiResponse<TodoEntity | null>
      >(`/todo/${todoData.id}`, todoData);
      spinner.hide();
      return data;
    } catch (error) {
      spinner.hide();
      return { success: false, error, data: null };
    }
  }

  async delete(
    todoData: TodoEntity,
    spinner: SpinnerOverlayService
  ): Promise<ApiResponse<null>> {
    spinner.show('Updating...');

    try {
      const { data } = await this.apiInstance.delete<ApiResponse<null>>(
        `/todo/${todoData.id}`
      );
      spinner.hide();
      return data;
    } catch (error) {
      spinner.hide();
      return { success: false, error, data: null };
    }
  }
}
