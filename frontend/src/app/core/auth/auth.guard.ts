import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { ToastrService } from 'ngx-toastr';

// Guard do próprio angular usado para validar a autenticação
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.sessionService.isLoggedIn()) return true;

    this.toastr.error('Você foi desconectado!');
    this.router.navigate(['/login']);
    return false;
  }
}
