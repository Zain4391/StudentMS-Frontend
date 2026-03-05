import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authInterceptor : HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    const token = authService.token; // read signal

    if(!token) {
        next(req);
    }

    const authorisedReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(authorisedReq);
}