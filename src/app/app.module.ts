import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ModuleWithProviders} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { RegisterFormComponent } from './shared/components/register/register-form.component';
import { UsersListComponent } from './shared/components/users/users-list.component';
import { UserService } from 'src/app/shared/service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule, 
    HttpModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
