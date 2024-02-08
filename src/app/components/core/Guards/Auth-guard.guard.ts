import { inject } from '@angular/core';
import { CanActivateFn, Route, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.sevice';
import { AuthenticationResponse } from '../../shared/models/authentication-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CoreService } from '../services/core.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);  
  const tokenStorage = inject(TokenStorageService)
  const coreService = inject(CoreService)
  const storedUser = tokenStorage.getUser();
    if (storedUser) {
        const authResponse: AuthenticationResponse = JSON.parse(storedUser);
        const token = authResponse.token;
        if (token) {
            const jwtHelper = new JwtHelperService();
            const isTokenNonExpired = !jwtHelper.isTokenExpired(token);
            if (isTokenNonExpired) {
                return true;
            }
        }
    }
    router.navigate(['authentication/login']);
    coreService.openSuccessSnackBar(
      'you musst logged in first'
  );
    return false;
};

export const loginGuard: CanActivateFn = (route, state) => {
    const tokenStorage = inject(TokenStorageService);
    const router = inject(Router);
    if (tokenStorage.isLoggedIn() === true) {
        router.navigate(['ecommerce']);
        return false;
    }
    return true;
};
