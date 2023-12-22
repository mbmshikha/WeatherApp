import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { WeatherApiService } from '../services/weatherapi.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  weatherForm: FormGroup;
  enteredLocation: string = '';
  weatherData: any;
  isFormInvalid: boolean = false;

  constructor(private apiService: WeatherApiService, private fb: FormBuilder) {
    // this.weatherForm = new FormGroup({
    //   location: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(5),
    //   ]),
    // });
    this.weatherForm = this.fb.group({
      location: ['', Validators.compose([Validators.required])],
    });
    this.handleFormChanges();
  }

  ngOnInit(): void {}

  handleFormChanges() {
    this.weatherForm.valueChanges.subscribe((resp) => {
      console.log('handle Form changes: ', resp);
    });
  }

  onSubmit() {
    if (this.weatherForm.valid) {
      this.enteredLocation = this.weatherForm.get('location')?.value;
      this.weatherForm.get('location')?.patchValue('');
      console.log('Entered Location', this.enteredLocation);
      this.apiService.getWeatherData(this.enteredLocation).subscribe((resp) => {
        this.weatherData = resp;
        console.log(this.weatherData);
        

      });
    } else {
      this.isFormInvalid = true;
      this.weatherData = '';
    }
  }
}
