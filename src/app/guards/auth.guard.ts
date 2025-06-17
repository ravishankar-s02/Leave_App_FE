import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // 1️⃣ Block login if already logged in
    if (state.url.includes('/auth') || state.url.includes('/login')) {
      if (token && role) {
        this.router.navigate(['/dashboard/apply-leave']);
        return false;
      }
      return true;
    }

    // 2️⃣ If not logged in, redirect to login
    if (!token || !role) {
      this.router.navigate(['/auth']);
      return false;
    }

    // 3️⃣ Non-admin trying to access admin-only pages
    const isAdmin = role === 'Admin';
    const userAllowedUrls = [
      '/dashboard/apply-leave',
      '/dashboard/my-leaves',
      '/dashboard/leave-summary'
    ];

    if (!isAdmin && !userAllowedUrls.includes(state.url)) {
      this.router.navigate(['/dashboard/apply-leave']);
      return false;
    }

    // ✅ All other access is allowed
    return true;
  }
}
