import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        weekends: true,
        events: [
            { title: 'Meeting with UI/UX Designers', date: '2023-08-12' },
            { title: 'Call for payment Project NOK', date: '2023-08-06' },
            { title: 'Picnic with my Family', date: '2023-08-21' },
            { title: 'Project Work with Developers', date: '2023-08-15' },
            { title: 'Meeting with Developers', date: '2023-08-09' },
            { title: 'Consultation with Doctor', date: '2023-08-17' },
            { title: 'Consultation with Employees', date: '2023-08-04' },
            { title: 'Meeting with UI/UX Designers', date: '2023-09-12' },
            { title: 'Call for payment Project NOK', date: '2023-09-06' },
            { title: 'Picnic with my Family', date: '2023-09-21' },
            { title: 'Project Work with Developers', date: '2023-09-15' },
            { title: 'Meeting with Developers', date: '2023-09-09' },
            { title: 'Consultation with Doctor', date: '2023-09-17' },
            { title: 'Consultation with Employees', date: '2023-09-04' },
            { title: 'Meeting with UI/UX Designers', date: '2023-09-12' },
            { title: 'Call for payment Project NOK', date: '2023-09-06' },
            { title: 'Picnic with my Family', date: '2023-09-21' },
            { title: 'Project Work with Developers', date: '2023-09-15' },
            { title: 'Meeting with Developers', date: '2023-09-09' },
            { title: 'Consultation with Doctor', date: '2023-10-17' },
            { title: 'Consultation with Employees', date: '2023-10-04' },
            { title: 'Meeting with UI/UX Designers', date: '2023-11-12' },
            { title: 'Call for payment Project NOK', date: '2023-11-06' },
            { title: 'Picnic with my Family', date: '2023-10-21' },
            { title: 'Project Work with Developers', date: '2023-10-15' },
            { title: 'Meeting with Developers', date: '2023-10-09' },
            { title: 'Consultation with Doctor', date: '2023-12-17' },
            { title: 'Consultation with Employees', date: '2023-12-04' },
        ],
        plugins: [dayGridPlugin]
    };

    constructor(
        public dialog: MatDialog
    ) {}

    openAddEventDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
        this.dialog.open(AddEventDialogBox, {
            width: '600px',
            enterAnimationDuration,
            exitAnimationDuration
        });
    }

}

@Component({
    selector: 'add-event-dialog',
    templateUrl: './add-event-dialog.html',
})
export class AddEventDialogBox {

    constructor(
        public dialogRef: MatDialogRef<AddEventDialogBox>
    ) {}

    close(){
        this.dialogRef.close(true);
    }

}