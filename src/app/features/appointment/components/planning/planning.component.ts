import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {DatePipe, LowerCasePipe} from "@angular/common";
import {FullCalendarComponent, FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions} from '@fullcalendar/core';
import {planningConfig} from '../../../../core/config/planning.config';
import {Planning} from '../../models/planning.model';
import {AppointmentStatus} from '../../models/appointment.model';
import {AppointmentDetailsComponent} from '../appointment-details/appointment-details.component';
import {DialogService, DynamicDialogModule, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'g-planning',
  imports: [
    DatePipe,
    FullCalendarModule,
    LowerCasePipe,
    DynamicDialogModule
  ],
  providers: [DialogService],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent implements OnDestroy{
  calendarOptions !: CalendarOptions
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  @Input({alias: 'plannings', required: false}) plannings: Planning[] = []

  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {
    // this.initCalendarOptions();
    this.initPlannings();
  }

  show() {
    this.ref = this.dialogService.open(AppointmentDetailsComponent, {
      closable: true,
      width: '25%',
      closeOnEscape: true,
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      header: 'Detail',
    });
  }


  initCalendarOptions(){
      this.calendarOptions = {
        ...planningConfig,
        headerToolbar: {
          left: 'title,customPrev,customNext,today',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        eventClick: this.handleEventClick.bind(this),
        dateClick: (arg) => this.handleDateClick(arg),
        customButtons: {
          customPrev: {
            click: () => {
              this.calendarApi.prev();
            },
          },
          customNext: {
            click: () => {
              this.calendarApi.next();
            },
          }
        }
      }
  }

  get calendarApi() {
    return this.calendarComponent.getApi();
  }

  handleDateClick(arg: { dateStr: string; }) {
    alert('Date clicked: ' + arg.dateStr);
  }

  handleEventClick(arg: any) {
    this.show()
    // console.log(arg.event.extendedProps)
    // alert('Event clicked: ' + arg.event.title);
  }

  fakePlannings(){
    // this.plannings = [
    //   {
    //     _id: 1,
    //     name: 'Michel Sebastien',
    //     status: AppointmentStatus.CANCELLED,
    //     start: new Date('2025-03-18 08:30:00'),
    //     // end: new Date('2025-03-18 10:00:00'),
    //     statusClass: 'danger'
    //   },
    //   {
    //     _id: 1,
    //     name: 'Michel Sebastien',
    //     status: AppointmentStatus.CONFIRMED,
    //     start: new Date('2025-03-20 08:30:00'),
    //     // end: new Date('2025-03-20 12:00:00'),
    //     statusClass: 'success'
    //   },
    //   {
    //     _id: 1,
    //     name: 'Michel Sebastien',
    //     status: AppointmentStatus.PENDING,
    //     start: new Date('2025-03-21 15:30:00'),
    //     // end: new Date('2025-03-21 18:00:00'),
    //     statusClass: 'warning'
    //   }
    // ]
  }

  initPlannings(){
    this.fakePlannings();
    this.initCalendarOptions();
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.plannings.map(planning => ({
        id: planning._id.toString(),
        title: planning.description, // Nom de la personne
        start: planning.start.toISOString(), // Conversion en format ISO
        // end: planning.end.toISOString(),
        allDay: false,
        classNames: [`event-${planning.statusClass}`], // Ajoute une classe CSS pour le style
        extendedProps: {
          content: {
            ...planning
          }
        }
      }))
    }
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
