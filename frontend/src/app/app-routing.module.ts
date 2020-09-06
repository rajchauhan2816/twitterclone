import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'auth/login',
		component: LoginComponent
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: '**',
		component: ProfileComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
