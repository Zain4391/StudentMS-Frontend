import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/env";
import { Observable } from "rxjs";
import { PageResponse } from "../../shared/models/pagination.model";
import { StudentRequest, StudentResponse } from "../../shared/models/student.model";

@Injectable({ providedIn: "root" })
export class StudentService {

    // DI
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/students`;

    // HttpParams builds the ?page=0&size=10 query string cleanly
    getAll(page: number = 0, size: number = 10): Observable<PageResponse<StudentResponse>> {
        const params = new HttpParams()
        .set('page', page)
        .set('size', size)

        return this.http.get<PageResponse<StudentResponse>>(this.baseUrl, { params: params });
    }

    getById(id: number): Observable<StudentResponse> {
        return this.http.get<StudentResponse>(`${this.baseUrl}/${id}`);
    }

    getByEmail(email: string): Observable<StudentResponse> {
        return this.http.get<StudentResponse>(`${this.baseUrl}/email/${email}`);
    }

    getByMajor(major: string, page: number = 0, size: number = 0): Observable<PageResponse<StudentResponse>> {

        const params = new HttpParams()
        .set('page', page)
        .set('size', size)

        return this.http.get<PageResponse<StudentResponse>>(`${this.baseUrl}/major/${major}`, { params: params});
    }

    create(request: StudentRequest): Observable<StudentResponse> {
        return this.http.post<StudentResponse>(this.baseUrl, request);
    }

    update(id: number, request: StudentRequest): Observable<StudentResponse> {
        return this.http.put<StudentResponse>(`${this.baseUrl}/${id}`, request);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

}