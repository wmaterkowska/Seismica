import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-form-events',
  templateUrl: './form-events.component.html',
  styleUrls: ['./form-events.component.css']
})
export class FormEventsComponent {

  eventsForm = this.formBuilder.group({
    startYear: new FormControl(1964, [Validators.required]),
    startMonth: new FormControl(1, [Validators.required]),
    startDay: new FormControl(1, [Validators.required]),
    startTime: new FormControl('00:00:00', [Validators.required]),
    endYear: new FormControl(new Date().getFullYear(), [Validators.required]),
    endMonth: new FormControl(new Date().getMonth(), [Validators.required]),
    endDay: new FormControl(new Date().getDay(), [Validators.required]),
    endTime: new FormControl('00:00:00', [Validators.required]),
    minMag: new FormControl<number>(8, { validators: [Validators.required], nonNullable: true }),
    maxMag: new FormControl<number>(10, { validators: [Validators.required], nonNullable: true }),
  })


  constructor(private formBuilder: FormBuilder, private service: EventsService) { }

  async handleSubmit() {
    const eventsDataObj = await this.eventsForm.getRawValue();

    // date in format: 2011-01-09T00:00:00
    let startMonth: string = '';
    let startDay: string = '';
    if (eventsDataObj.startMonth) {
      startMonth = (eventsDataObj.startMonth < 10 ? '0' + eventsDataObj.startMonth.toString() : eventsDataObj.startMonth.toString());
    }
    if (eventsDataObj.startDay) {
      startDay = (eventsDataObj.startDay < 10 ? '0' + eventsDataObj.startDay.toString() : eventsDataObj.startDay.toString());
    }
    let startDate = `${eventsDataObj.startYear}-${startMonth}-${startDay}T${eventsDataObj.startTime}`;

    let endMonth: string = '';
    let endDay: string = '';
    if (eventsDataObj.endMonth) {
      endMonth = (eventsDataObj.endMonth < 10 ? '0' + eventsDataObj.endMonth.toString() : eventsDataObj.endMonth.toString());
    }
    if (eventsDataObj.endDay) {
      endDay = (eventsDataObj.endDay < 10 ? '0' + eventsDataObj.endDay.toString() : eventsDataObj.endDay.toString());
    }
    let endDate = `${eventsDataObj.endYear}-${endMonth}-${endDay}T${eventsDataObj.endTime}`;


    this.service.getEvents(startDate, endDate, eventsDataObj.minMag, eventsDataObj.maxMag);

    this.eventsForm.reset();
  }

}
