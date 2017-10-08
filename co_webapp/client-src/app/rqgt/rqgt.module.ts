import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RqgtComponent } from './rqgt.component';
import { RqgtRoutes } from './rqgt.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(RqgtRoutes),
    ],
    declarations: [
        RqgtComponent
    ]
})

export class RqgtModule { }
