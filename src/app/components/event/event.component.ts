import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html'
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  selectedEvent: Event = this.getEmptyEvent();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(
      data => {
        console.log('Events loaded:', data);
        this.events = data;
      },
      error => {
        console.error('Error loading events:', error);
      }
    );
  }
  selectEvent(event: Event) {
    this.selectedEvent = { ...event };
  }

  createEvent(): void {
    if (this.selectedEvent) {
      this.eventService.createEvent(this.selectedEvent).subscribe(
        () => {
          console.log('Event created successfully');
          this.loadEvents(); // Recharge la liste des événements
          this.resetSelectedEvent(); // Réinitialise le formulaire
        },
        error => {
          console.error('Error creating event:', error); // Log en cas d'erreur
        }
      );
    } else {
      console.warn('No event data to create');
    }
  }


  updateEvent(): void {
    this.eventService.updateEvent(this.selectedEvent.eventId, this.selectedEvent).subscribe(() => {
      this.loadEvents();
      this.resetSelectedEvent();
    });
  }

  deleteEvent(eventId: string) {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.loadEvents();
    });
  }

  resetSelectedEvent() {
    this.selectedEvent = this.getEmptyEvent();
  }

  getEmptyEvent(): Event {
    return {
      eventId: '',
      eventTitle: '',
      eventDescription: '',
      eventCategory: '',
      eventDateTime: new Date(),
      eventLocation: '',
      numberOfGuests: 0,
      createdBy: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
