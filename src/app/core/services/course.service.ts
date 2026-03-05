import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/env';
import {
  CourseRequest,
  CourseResponse,
} from '../../shared/models/course.model';
import { PageResponse } from '../../shared/models/pagination.model';

@Injectable({ providedIn: 'root' })
export class CourseService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/courses`;

  getAll(page: number = 0, size: number = 10): Observable<PageResponse<CourseResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<CourseResponse>>(this.baseUrl, { params });
  }

  getById(id: number): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.baseUrl}/${id}`);
  }

  getByCourseCode(courseCode: string): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.baseUrl}/code/${courseCode}`);
  }

  getByTeacherId(teacherId: number, page: number = 0, size: number = 10): Observable<PageResponse<CourseResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<CourseResponse>>(`${this.baseUrl}/teacher/${teacherId}`, { params });
  }

  getAvailable(page: number = 0, size: number = 10): Observable<PageResponse<CourseResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<CourseResponse>>(`${this.baseUrl}/available`, { params });
  }

  create(request: CourseRequest): Observable<CourseResponse> {
    return this.http.post<CourseResponse>(this.baseUrl, request);
  }

  update(id: number, request: CourseRequest): Observable<CourseResponse> {
    return this.http.put<CourseResponse>(`${this.baseUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}