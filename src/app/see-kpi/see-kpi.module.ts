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

import { DragulaModule } from 'ng2-dragula';

import { SeeKpiRoutingModule } from './see-kpi-routing.module';
import { SeeKPIComponent } from './see-kpi.component';
import { NavBarLogoutComponent } from './nav-bar-logout/nav-bar-logout.component';
import { LogoutModalComponent } from './nav-bar-logout/logout-modal/logout-modal.component';
import { NavSlideMenuComponent } from './nav-slide-menu/nav-slide-menu.component';
import { ImportEmployeeComponent } from './import-employee/import-employee.component';
import { ImportOrganizationComponent } from './import-organization/import-organization.component';
import { MenuManageModalComponent } from './nav-slide-menu/menu-manage-modal/menu-manage-modal.component';
import { AddEditMenuDialog } from './nav-slide-menu/menu-manage-modal/menu-manage-modal.component';
import { DeleteMenuDialog } from './nav-slide-menu/menu-manage-modal/menu-manage-modal.component';

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
    DragulaModule.forRoot()
  ],
  entryComponents: [
    LogoutModalComponent,
    MenuManageModalComponent,
    AddEditMenuDialog,
    DeleteMenuDialog
  ],
  declarations: [
    SeeKPIComponent,
    NavBarLogoutComponent,
    LogoutModalComponent,
    NavSlideMenuComponent,
    ImportEmployeeComponent,
    ImportOrganizationComponent,
    MenuManageModalComponent,
    AddEditMenuDialog,
    DeleteMenuDialog
  ]
})
export class SeeKpiModule { }
