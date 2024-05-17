import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LibraryComponent } from './library/library.component';
import { SettingsComponent } from './settings/settings.component';
import { GamedetailsComponent } from './gamedetails/gamedetails.component';

export const appRoutes: Route[] = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent },
    { path: 'games', component: GamesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'library', component: LibraryComponent },
    { path: 'settings', component: SettingsComponent},
    { path: 'gamedetails/:gameId', component: GamedetailsComponent },
];
