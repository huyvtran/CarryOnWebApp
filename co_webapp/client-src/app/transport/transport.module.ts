import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransportPublishComponent } from './transport-publish.component';
import { TransportRoutes } from './transport.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(TransportRoutes),
    ],
    declarations: [
        TransportPublishComponent
    ]
})

export class TransportModule { }
