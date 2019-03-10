import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './shared/auth.guard';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { roleReducer } from './nav-slide-menu/manage-modal/role-manage/state/role-manage.reducer';
import { RoleEffect } from './nav-slide-menu/manage-modal/role-manage/state/role-manage.effects';

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
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragulaModule } from 'ng2-dragula';

import { PrivateComponent } from './private.component';
import { NavBarLogoutComponent } from './nav-bar-logout/nav-bar-logout.component';
import { LogoutModalComponent } from './nav-bar-logout/logout-modal/logout-modal.component';
import { NavSlideMenuComponent } from './nav-slide-menu/nav-slide-menu.component';
import { ImportEmployeeComponent } from './import-employee/import-employee.component';
import { ImportOrganizationComponent } from './import-organization/import-organization.component';
import { ManageModalComponent } from './nav-slide-menu/manage-modal/manage-modal.component';
import { AddEditMenuDialog } from './nav-slide-menu/manage-modal/menu-group/menu-group.component';
import { DeleteMenuDialog } from './nav-slide-menu/manage-modal/menu-group/menu-group.component';
import { MenuGroupComponent } from './nav-slide-menu/manage-modal/menu-group/menu-group.component';
import { RoleManageComponent } from './nav-slide-menu/manage-modal/role-manage/role-manage.component';
import { DeleteRoleDialog } from './nav-slide-menu/manage-modal/role-manage/role-manage.component';
import { RoleMenuComponent } from './nav-slide-menu/manage-modal/role-menu/role-menu.component';
import { UserManageComponent } from './nav-slide-menu/manage-modal/user-manage/user-manage.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ImportEmployeeComponent },
      { path: 'employee', component: ImportEmployeeComponent },
      { path: 'organization', component: ImportOrganizationComponent }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
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
    RouterModule.forChild(routes),
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
    DeleteRoleDialog
  ],
  declarations: [
    PrivateComponent,
    NavBarLogoutComponent,
    LogoutModalComponent,
    NavSlideMenuComponent,
    ImportEmployeeComponent,
    ImportOrganizationComponent,
    ManageModalComponent,
    AddEditMenuDialog,
    DeleteMenuDialog,
    MenuGroupComponent,
    RoleManageComponent,
    DeleteRoleDialog,
    RoleMenuComponent,
    UserManageComponent
  ]
})
export class PrivateModule { }
