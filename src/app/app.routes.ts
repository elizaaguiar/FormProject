import { Routes } from '@angular/router';
import { AddressFormComponent } from './pages/address-form/address-form.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { AppComponent } from './app.component';
import { ItemFormComponent } from './componentes/item-form/item-form.component';

export const routes: Routes = [
    {
        path: "",
        component: ItemFormComponent,
        children: [
            { path: "", component: UserFormComponent },
            { path: "address", loadComponent: () => AddressFormComponent },
        ],
    }
];
