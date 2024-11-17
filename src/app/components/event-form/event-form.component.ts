import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html'
})
export class EventFormComponent implements OnInit {
  event: Event = {
    eventId: '',
    eventTitle: '',
    eventDescription: '',
    eventCategory: '',
    eventDateTime: '',
    eventLocation: '',
    numberOfGuests: 0,
    createdBy: '',
    createdAt: '',
    updatedAt: ''
  };
  isEditMode = false;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.isEditMode = true;
      this.eventService.getEvent(eventId).subscribe(event => {
        this.event = event;
      });
    }
  }

  saveEvent() {
    if (this.isEditMode) {
      this.eventService.updateEvent(this.event).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.eventService.createEvent(this.event).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
