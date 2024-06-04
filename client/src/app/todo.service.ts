import { Injectable } from "@angular/core"
import { AxiosInstance } from "axios"
import { environment } from "src/environments/environment"
import { ApiResponse, ApiResponseList, TodoEntity } from "./form/form.component"
import api from "./httpClient"
import { SpinnerOverlayService } from "./spinner-overlay/spinner-overlay.service"

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private apiInstance: AxiosInstance = api({ baseURL: environment.apiUrl })

  constructor() {}

  async listAll(
    spinner: SpinnerOverlayService
  ): Promise<ApiResponseList<TodoEntity>> {
    spinner.show()

    try {
      const { data } = await this.apiInstance.get<ApiResponseList<TodoEntity>>(
        "/todo"
      )

      return data
    } catch (error) {
      return { success: false, error, result: [] }
    } finally {
      spinner.hide()
    }
  }

  async add(
    todoData: TodoEntity,
    spinner: SpinnerOverlayService
  ): Promise<ApiResponse<TodoEntity | null>> {
    spinner.show()

    try {
      const { data } = await this.apiInstance.put<
        ApiResponse<TodoEntity | null>
      >("/todo", todoData)

      return data
    } catch (error) {
      return { success: false, error, data: null }
    } finally {
      spinner.hide()
    }
  }

  async update(
    todoData: TodoEntity,
    spinner: SpinnerOverlayService
  ): Promise<ApiResponse<TodoEntity | null>> {
    spinner.show()

    try {
      const { data } = await this.apiInstance.patch<
        ApiResponse<TodoEntity | null>
      >(`/todo/${todoData.id}`, todoData)

      return data
    } catch (error) {
      return { success: false, error, data: null }
    } finally {
      spinner.hide()
    }
  }

  async delete(
    todoData: TodoEntity,
    spinner: SpinnerOverlayService
  ): Promise<ApiResponse<null>> {
    spinner.show()

    try {
      const { data } = await this.apiInstance.delete<ApiResponse<null>>(
        `/todo/${todoData.id}`
      )

      return data
    } catch (error) {
      return { success: false, error, data: null }
    } finally {
      spinner.hide()
    }
  }
}
