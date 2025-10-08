import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const instructorGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  const id = inject(PLATFORM_ID);
  if (isPlatformBrowser(id)) {
    const userRole = localStorage.getItem('Role')!;
    if (userRole === 'Instructor') {
      return true;
    } else {
      _router.navigate(['/LogIn']);
      return false;
    }
  } else {
    return false;
  }
};
