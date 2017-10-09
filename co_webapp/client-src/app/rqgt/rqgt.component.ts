import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rqgtService } from './../_services/rqgt.service';

@Component({
    moduleId: module.id,
    selector: 'rqgt-cmp',
    templateUrl: 'rqgt.component.html'
})

export class RqgtComponent implements OnInit{

    constructor(private rqgtService: rqgtService, private router: Router) { }

    ngOnInit() {
        //this.rqgtService.getFilteredRqgt();
    }

    public showSuggestPublishFooter = true;

    loadRqgt() {
        this.rqgtService.getFilteredRqgt();
    }

    publishAvailability() {
        this.router.navigateByUrl('/transport-publish');
        //this.router.navigateByUrl('/dashboard');
    }
}
