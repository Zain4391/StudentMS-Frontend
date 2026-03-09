import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavBarComponent } from "./navbar.component";

@Component({
    selector: "app-main-layout",
    standalone: true,
    imports: [RouterOutlet, NavBarComponent],
    templateUrl: "./main-layout.component.html"
})
export class MainLayoutComponent {}