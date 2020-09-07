import { AuthGuard } from './auth/auth.guard';
import { ReplyComponent } from './shared/reply/reply.component';
import { ExploreComponent } from './explore/explore.component';
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
		component: HomeComponent,
		canActivate: [ AuthGuard ]
	},
	{
		path: 'explore',
		canActivate: [ AuthGuard ],
		component: ExploreComponent
	},
	{
		path: ':username',
		canActivate: [ AuthGuard ],
		component: ProfileComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
