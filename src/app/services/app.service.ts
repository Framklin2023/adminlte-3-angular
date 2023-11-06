import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
//import { catchError, retry } from 'rxjs/operators';
import {Gatekeeper} from 'gatekeeper-client-sdk';

import { environment } from '../../environments/environment';
import { Provincia } from '../../models/provincia';
import { Acceso } from '../../models/acceso';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;
    //-----
    laprovincia:Provincia= {name:'hola'};
    token:Object={};

    //----
    constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {}

 async   loginByAuth(ujson:object) {
         try {
            let url1=environment.urlapi+`/login`
            const headers = {
              'Content-Type': 'application/json',
            };
            this.http.post(url1,ujson,{headers}).subscribe(r =>{let sal =r as Acceso; localStorage.setItem('gatekeeper_token',sal.token);});
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByAuth({email, password}) {
        try {
            const token = await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Login success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
            this.toastr.success('Register success');
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        try {
           // this.user = await Gatekeeper.getProfile();
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    }
}
