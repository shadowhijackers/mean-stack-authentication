import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../../core/http/api.service";
import {StorageKeys} from "../../../core/modals/storage-keys.enum";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
  ) {

    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
    });

  }

  ngOnInit() {
  }

  submit() {
    this.api.register(this.registerForm.value).subscribe((res) => {
      if (res && !res.error) {
        localStorage.setItem(StorageKeys.TOKEN, res.token);
        this.router.navigateByUrl('/users');
        return;
      }
    })
  }
}
