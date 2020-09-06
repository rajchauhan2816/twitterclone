import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './auth/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostCardComponent } from './shared/post-card/post-card.component';
import { CreatePostComponent } from './shared/create-post/create-post.component';

@NgModule({
	declarations: [ AppComponent, LoginComponent, SignupComponent, ProfileComponent, HomeComponent, ExploreComponent, NavbarComponent, PostCardComponent, CreatePostComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		NgbModule,
		HttpClientModule,
		FormsModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
