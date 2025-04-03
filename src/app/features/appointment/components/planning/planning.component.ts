import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {DatePipe, LowerCasePipe} from "@angular/common";
import {FullCalendarComponent, FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions} from '@fullcalendar/core';
import {planningConfig} from '../../../../core/config/planning.config';
import {Planning} from '../../models/planning.model';
import {AppointmentStatus} from '../../models/appointment.model';
import {AppointmentDetailsComponent} from '../appointment-details/appointment-details.component';
import {DialogService, DynamicDialogModule, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AppointmentService} from '../../services/appointment.service';
// import { RendezvousService } from '../../../mechanic/services/rendezvous.service';

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
export class PlanningComponent implements OnDestroy {
  calendarOptions !: CalendarOptions;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @Input({alias: 'plannings', required: false}) plannings: Planning[] = [];

  ref: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private rendezvousService: AppointmentService // Ajout du service
  ) {}

  ngOnInit() {
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
    };
  }

  get calendarApi() {
    return this.calendarComponent.getApi();
  }

  handleDateClick(arg: { dateStr: string; }) {
    alert('Date clicked: ' + arg.dateStr);
  }

  handleEventClick(arg: any) {
    this.show();
  }

  initPlannings() {
    // this.rendezvousService.getPlanning().subscribe((plannings: Planning[]) => {
    //   this.plannings = plannings.map(item => ({
    //     _id: item._id,
    //     name: item.description,
    //     status: item.status,
    //     start: new Date(item.start),
    //     end: new Date(item.start),
    //     statusClass: item.statusClass
    //   }));
    //
    //   this.initCalendarOptions();
    //   this.calendarOptions = {
    //     ...this.calendarOptions,
    //     events: this.plannings.map(planning => ({
    //       id: planning._id.toString(),
    //       title: planning.description,
    //       start: planning.start.toISOString(),
    //       end: planning.start.toISOString(),
    //       allDay: false,
    //       classNames: [`event-${planning.statusClass}`],
    //       extendedProps: {
    //         content: { ...planning }
    //       }
    //     }))
    //   };
    // }, error => {
    //   console.error('Erreur lors de la récupération des plannings:', error);
    // });
  }


  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
