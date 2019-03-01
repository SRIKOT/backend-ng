import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { DragulaModule } from 'ng2-dragula';

import { SeeKpiRoutingModule } from './see-kpi-routing.module';
import { SeeKPIComponent } from './see-kpi.component';
import { NavBarLogoutComponent } from './nav-bar-logout/nav-bar-logout.component';
import { LogoutModalComponent } from './nav-bar-logout/logout-modal/logout-modal.component';
import { NavSlideMenuComponent } from './nav-slide-menu/nav-slide-menu.component';
import { ImportEmployeeComponent } from './import-employee/import-employee.component';
import { ImportOrganizationComponent } from './import-organization/import-organization.component';
import { ManageModalComponent } from './nav-slide-menu/manage-modal/manage-modal.component';
import { AddEditMenuDialog } from './nav-slide-menu/manage-modal/menu-manage/menu-manage.component';
import { DeleteMenuDialog } from './nav-slide-menu/manage-modal/menu-manage/menu-manage.component';
import { MenuManageComponent } from './nav-slide-menu/manage-modal/menu-manage/menu-manage.component';
import { MenuAuthorizedComponent } from './nav-slide-menu/manage-modal/menu-authorized/menu-authorized.component';
import { AddEditAuthorizedDialog } from './nav-slide-menu/manage-modal/menu-authorized/menu-authorized.component';

import { EffectsModule, Actions } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { roleReducer } from './nav-slide-menu/manage-modal/menu-authorized/state/menu-authorized.reducer';
import { RoleEffect } from './nav-slide-menu/manage-modal/menu-authorized/state/menu-authorized.effects';

import { customerReducer } from './customers/state/customer.reducer';
import { CustomerEffect } from './customers/state/customer.effects';

import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';

@NgModule({
  imports: [
    CommonModule,
    SeeKpiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    DragulaModule.forRoot(),
    StoreModule.forFeature('roles', roleReducer),
    EffectsModule.forFeature([RoleEffect]),
    PopoverModule.forRoot()
  ],
  entryComponents: [
    LogoutModalComponent,
    ManageModalComponent,
    AddEditMenuDialog,
    DeleteMenuDialog,
    AddEditAuthorizedDialog
  ],
  declarations: [
    SeeKPIComponent,
    NavBarLogoutComponent,
    LogoutModalComponent,
    NavSlideMenuComponent,
    ImportEmployeeComponent,
    ImportOrganizationComponent,
    ManageModalComponent,
    AddEditMenuDialog,
    DeleteMenuDialog,
    MenuManageComponent,
    MenuAuthorizedComponent,
    AddEditAuthorizedDialog,
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent
  ]
})
export class SeeKpiModule { }
