import { Component, computed, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
    selector: "app-navbar",
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: "./navbar.component.html"
})
export class NavBarComponent {

    private auth = inject(AuthService);

    readonly user = computed(() => this.auth.currentUser());
    readonly role = computed(() => this.auth.role());
    readonly isAdmin = computed(() => this.auth.isAdmin());

    menuOpen = false;

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    logout() {
        this.auth.logout();
    }
}