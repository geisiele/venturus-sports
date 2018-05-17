import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterFormComponent } from './shared/components/register/register-form.component';
import { UsersListComponent } from './shared/components/users/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
