import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/env';
import {
  TeacherRequest,
  TeacherResponse,
} from '../../shared/models/teacher.model';
import { PageResponse } from '../../shared/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class TeacherService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/teachers`;

  getAll(page: number = 0, size: number = 10): Observable<PageResponse<TeacherResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<TeacherResponse>>(this.baseUrl, { params });
  }

  getById(id: number): Observable<TeacherResponse> {
    return this.http.get<TeacherResponse>(`${this.baseUrl}/${id}`);
  }

  getByEmail(email: string): Observable<TeacherResponse> {
    return this.http.get<TeacherResponse>(`${this.baseUrl}/email/${email}`);
  }

  getByDepartment(department: string, page: number = 0, size: number = 10): Observable<PageResponse<TeacherResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<TeacherResponse>>(`${this.baseUrl}/department/${department}`, { params });
  }

  getBySpecialization(specialization: string, page: number = 0, size: number = 10): Observable<PageResponse<TeacherResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<TeacherResponse>>(`${this.baseUrl}/specialization/${specialization}`, { params });
  }

  create(request: TeacherRequest): Observable<TeacherResponse> {
    return this.http.post<TeacherResponse>(this.baseUrl, request);
  }

  update(id: number, request: TeacherRequest): Observable<TeacherResponse> {
    return this.http.put<TeacherResponse>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}