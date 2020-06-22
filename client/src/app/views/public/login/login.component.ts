import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../core/http/api.service";
import {StorageKeys} from "../../../core/modals/storage-keys.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
  ) {

    this.loginForm = this.formBuilder.group({
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
    this.api.login(this.loginForm.value).subscribe((res) => {
      if (res && !res.error) {
        localStorage.setItem(StorageKeys.TOKEN, res.token);
        this.router.navigateByUrl('/users');
        return;
      }
    })
  }

}
