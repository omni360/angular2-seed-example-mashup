import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Router} from 'angular2/router';
import {Http, Headers, RequestOptions, RequestOptionsArgs} from 'angular2/http';
import {IRegistration, IRegistrationResponse, ILoginRequest,
	    ILoginResult, IRegisteredUser} from '../../common/interfaces/RegistrationInterfaces';

@Injectable()
export class Authentication {
	_user: IRegisteredUser;
	lastRoute: string = '';

	constructor(public router: Router, public http: Http) {

		this.router.subscribe(v => {
			if (v === 'login' || v === 'register' ) {
				console.log(`Ignoring setting last route to ${v}`);
			} else {
				this.lastRoute = v;
				console.log(`Set last route to ${this.lastRoute}`);
			}
		});
	}

	authenticate(): boolean {

		if (!this.isLoggedIn()) {
			this.router.navigateByUrl('/login');
			return false;
		}

		return true;
	}

	isLoggedIn(): boolean {
		let result = !!this._user;
        return result;
	}

	get user(): IRegisteredUser {
		return this._user;
	}

	login(username: string, password: string): Observable<ILoginResult> {
		var loginRequest: ILoginRequest = { username: username, password: password };

		var p = this.http.post('/api/login',
			JSON.stringify(loginRequest), this.getPostOptions());

        var result = p.map(response => {
				var loginResult = <ILoginResult>response.json();

				if (loginResult.succeeded) {
					this._user = loginResult.userInfo;
				}
				return loginResult;
			});

		return result;
	}

	logout() {
		this._user = null;
	}

	getLastRoute(): string {
		return this.lastRoute;
	}

	register(registrationRequest: IRegistration): Observable<IRegistrationResponse> {
		var result = this.http.post('/api/users/register/',
			JSON.stringify(registrationRequest),
			this.getPostOptions());

		return result.map(r => <IRegistrationResponse>r.json());
	}

	getPostOptions(): RequestOptions {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');

		var options: RequestOptionsArgs = {
			headers: headers
		};

		return new RequestOptions(options);
	}

}
