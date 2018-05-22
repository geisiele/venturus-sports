import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  fRegister: FormGroup;
  oUser: User;
  lRide: Array<any>;
  lDaysOfWeek: Array<any>;
  boSave: boolean;

  constructor(
    private userService: UserService,
    formBuilder: FormBuilder
  ) {
    this.fRegister = formBuilder.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      city: ['', null],
      ride: ['', null]
    });
    this.oUser = new User();
    this.lRide = ["Always", "Sometimes", "Never"];
    this.lDaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.boSave = false;
  }

  addControls() {
    this.lRide.forEach(item => {
      this.fRegister.addControl(item.toString(), new FormControl(null));
    });
    this.lDaysOfWeek.forEach(item => {
      this.fRegister.addControl(item.toString(), new FormControl(null));
    });
  }

  onChangeRadio(item: any) {
    this.oUser.ride = item;
  }

  onChangeCheckbox(item: string, isChecked: boolean) {
    if (isChecked) {
      this.oUser.daysOfWeek.push(item);
    } else {
      let index = this.oUser.daysOfWeek.findIndex(x => x === item)
      this.oUser.daysOfWeek.splice(index, 1);
    }
  }

  addUser(user: User) {
    this.userService.lUser.push(user);
    this.discard();
  }

  discard() {
    this.fRegister.reset();
  }

  ngOnInit() {
    this.addControls();
    this.onChangeRadio(this.lRide[0]);
  }

}
