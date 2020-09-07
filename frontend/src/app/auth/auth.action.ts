// ACTIONS
export class Signin {
	static readonly type = '[Auth] Signin';
	constructor(public username: string, public password: string) {}
}

export class Signout {
	static readonly type = '[Auth] Signout';
}

export class Signup {
	constructor(public username: string, public password: string, public age: number, public name: string) {}
	static readonly type = '[Auth] Signup';
}

// EVENTS OR STATE
export class SigninSuccess {
	constructor(public success: boolean, public username: string) {}

	static readonly type = '[Auth] Signin Success';
}
export class SignupSuccess {
	constructor() {}

	static readonly type = '[Auth] Signup Success';
}
// EVENTS OR STATE
export class SigninApproved {
	constructor(public success: boolean, public username: string) {}

	static readonly type = '[Auth] Signin Approved';
}

export class SigninFailed {
	constructor(public error: string) {}
	static readonly type = '[Auth] Signin Failed';
}
