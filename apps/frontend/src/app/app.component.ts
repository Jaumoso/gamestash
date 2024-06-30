import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./core/header/header.component";
import { FooterComponent } from './core/footer/footer.component';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterModule, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'frontend';
}
