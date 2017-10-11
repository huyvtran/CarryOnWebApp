import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableData } from '../md/md-table/md-table.component';
import { CoGlobalsService } from './../_services/coGlobals.service';

import * as Chartist from 'chartist';
import { DatePickerComponent } from "ng2-date-picker";
import { RqgtService } from "app/_services/rqgt.service";
import { TransportService } from "app/_services/transport.service";

declare var $: any;
declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['../../assets/css/material-kit.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    @ViewChild('dayPicker') datePicker: DatePickerComponent;

    public autocompleteFrom: any;
    public autocompleteTo: any;
    public reqDate: any;
    public datePickerConfig: any;
    public dp2Customized: boolean;
    public hasTransport: boolean;
    public hasGoods: boolean;
    public userIsRegistering: boolean; 

    constructor(private coGlobalsService: CoGlobalsService, private rqgtService: RqgtService,
        private transportService: TransportService, private router: Router) { }

    /* -----------------   Maps init   -------------------- */
    loadGooleMaps() {
        /* Load gmaps asynchronously */
        this.coGlobalsService.loadGooleMaps().then(
            () => {
                this.autocompleteFrom = new google.maps.places.Autocomplete(
                    (document.getElementById('req-filter-from')),
                    { types: ['geocode'] });
                this.autocompleteTo = new google.maps.places.Autocomplete(
                    (document.getElementById('req-filter-to')),
                    { types: ['geocode'] });
            }
        );
    }

    /* User clicked has goods or has transport */
    userHasGoods(_hasGoods) {
        this.hasTransport = !_hasGoods;
        this.hasGoods = _hasGoods;
    };

    /* Proceed button clicked */
    public proceed() {
        /* First fill module */
        this.fillModels();
        /* Then go to transport list view or rqgt-list view */
        if (this.hasTransport) {
            this.router.navigateByUrl('/rqgt-list');
        } else {
            this.router.navigateByUrl('/transport-list');
        };
    };

    /* Fill service with module data for next step */
    private fillModels() {
        /* -------------------------------------------------- */
        /* ------------------ Rqgt service ------------------ */
        /* -------------------------------------------------- */
        this.rqgtService.currentRqgt = {
            fromAddress: this.autocompleteFrom && this.autocompleteFrom.location,
            destAddress: this.autocompleteTo && this.autocompleteTo.location,
            dateShown: this.reqDate,
            reqGoodTransportOpt: {}
        };
        /* Set service loaded results to false, in order to load new results */
        this.rqgtService.loadedRqgtResults = false;
        /* -------------------------------------------------- */
        /* --------------- Transport service ---------------- */
        /* -------------------------------------------------- */
        this.transportService.currentTransport = {
            fromAddress: this.autocompleteFrom && this.autocompleteFrom.location,
            destAddress: this.autocompleteTo && this.autocompleteTo.location,
            dateShown: this.reqDate,
            reqGoodTransportOpt: {}
        };
        /* Set service loaded results to false, in order to load new results */
        this.transportService.loadedTransportResults = false;
    };

    // constructor(private navbarTitleService: NavbarTitleService) { }
    public ngOnInit() {

        /* Init variables */
        this.hasTransport = true;
        this.hasGoods = false;

        /* DatePicker */
        /* -----------------   DatePicker Angular2 directive  -------------------- */
        this.datePickerConfig = {
            locale: 'it',
            format: 'DD-MM-YYYY'
        };

        //$('.dp-picker-input').click(() => {
        //    if (this.dp2Customized !== true) {
        //        $('.dp-calendar-wrapper').append("<div class='dp-asap-btn'><a>Test</a></div>");
        //        this.dp2Customized = true;
        //        $('.dp-asap-btn').click( () => {
        //            this.datePicker.api.close();
        //        });
        //    }

        //});

        /* Gmaps loading */
        this.loadGooleMaps();

        /* -----------------   Datetime Picker   -------------------- */

        //  Init Bootstrap Select Picker
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker();
        };

        var selectDate = $('.datepicker').datetimepicker({
            showClose: true,
            format: 'MM/DD/YYYY',
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove',
                inline: true
            }
        });

        //selectDate.on('dp.show', function () {
        //    $('*[data-action="close"]').unbind("click");
        //    //alert('opened');
        //    $('*[data-action="close"]').click(function () {
        //        alert('closed');
        //        this.reqDate = '';
        //    });

        //});

        //selectDate.on('dp.hide', function () {
        //    //alert('hide');
        //});

        // data-action="close"

        /* -----------------   Datetime Picker   -------------------- */
    }


    ngAfterViewInit() {
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }
}
