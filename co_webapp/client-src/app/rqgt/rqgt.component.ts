import { Component } from '@angular/core';
import { rqgtService } from './../_services/rqgt.service';

@Component({
    moduleId: module.id,
    selector: 'rqgt-cmp',
    templateUrl: 'rqgt.component.html'
})

export class RqgtComponent{


    constructor(private rqgtService: rqgtService) { }

    loadRqgt() {
        this.rqgtService.getFilteredRqgt();
    }
}
