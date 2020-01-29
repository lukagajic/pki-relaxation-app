import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './components/events/events.component';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ConfirmComponent } from './components/events/confirm/confirm.component';
import { JoinedEventsComponent } from './components/dashboard/joined-events/joined-events.component';
import { RecommendedEventsComponent } from './components/dashboard/recommended-events/recommended-events.component';
import { FinishedEventsComponent } from './components/dashboard/finished-events/finished-events.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';
import { ShowParticipantsComponent } from './components/events/show-participants/show-participants.component';
import { RateEventComponent } from './components/dashboard/finished-events/rate-event/rate-event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    AddEventComponent,
    DashboardComponent,
    ProfileComponent,
    EditProfileComponent,
    ConfirmComponent,
    JoinedEventsComponent,
    RecommendedEventsComponent,
    FinishedEventsComponent,
    EditEventComponent,
    ShowParticipantsComponent,
    RateEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddEventComponent,
                    EditProfileComponent,
                    ConfirmComponent,
                    EditEventComponent,
                    ShowParticipantsComponent,
                    RateEventComponent]
})
export class AppModule { }
