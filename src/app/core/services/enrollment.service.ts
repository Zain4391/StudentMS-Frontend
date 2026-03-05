import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/env';
import {
  EnrollmentRequest,
  EnrollmentResponse,
} from '../../shared/models/enrollment.model';
import { PageResponse } from '../../shared/models/pagination.model';
import { Grade } from '../../shared/models/enums';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/enrollments`;

  getAll(page: number = 0, size: number = 10): Observable<PageResponse<EnrollmentResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<EnrollmentResponse>>(this.baseUrl, { params });
  }

  getById(id: number): Observable<EnrollmentResponse> {
    return this.http.get<EnrollmentResponse>(`${this.baseUrl}/${id}`);
  }

  getByStudentId(studentId: number, page: number = 0, size: number = 10): Observable<PageResponse<EnrollmentResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<EnrollmentResponse>>(`${this.baseUrl}/student/${studentId}`, { params });
  }

  getByCourseId(courseId: number, page: number = 0, size: number = 10): Observable<PageResponse<EnrollmentResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<EnrollmentResponse>>(`${this.baseUrl}/course/${courseId}`, { params });
  }

  getByTeacherId(teacherId: number, page: number = 0, size: number = 10): Observable<PageResponse<EnrollmentResponse>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PageResponse<EnrollmentResponse>>(`${this.baseUrl}/teacher/${teacherId}`, { params });
  }

  enroll(request: EnrollmentRequest): Observable<EnrollmentResponse> {
    return this.http.post<EnrollmentResponse>(this.baseUrl, request);
  }

  update(id: number, request: EnrollmentRequest): Observable<EnrollmentResponse> {
    return this.http.put<EnrollmentResponse>(`${this.baseUrl}/${id}`, request);
  }

  // PATCH /{id}/grade?grade=A&teacherId=1
  updateGrade(enrollmentId: number, grade: Grade, teacherId: number): Observable<EnrollmentResponse> {
    const params = new HttpParams()
      .set('grade', grade)
      .set('teacherId', teacherId);

    return this.http.patch<EnrollmentResponse>(`${this.baseUrl}/${enrollmentId}/grade`, null, { params });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}