import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableData } from '../md/md-table/md-table.component';
import { CoGlobalsService } from './../_services/coGlobals.service';

import * as Chartist from 'chartist';
import { DatePickerComponent } from "ng2-date-picker";

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
    public reqDate: any;
    public datePickerConfig: any;
    public dp2Customized: boolean;

    constructor(private coGlobalsService: CoGlobalsService) { }

    /* -----------------   Maps init   -------------------- */
    loadGooleMaps() {
        /* Load gmaps asynchronously */
        this.coGlobalsService.loadGooleMaps().then(
            () => {
                this.autocompleteFrom = new google.maps.places.Autocomplete(
                    (document.getElementById('req-filter-from')),
                    { types: ['geocode'] });
                this.autocompleteFrom = new google.maps.places.Autocomplete(
                    (document.getElementById('req-filter-to')),
                    { types: ['geocode'] });
            }
        );
    }

    public closaDp() {
        this.datePicker.api.close();     
    };

    // constructor(private navbarTitleService: NavbarTitleService) { }
    public ngOnInit() {

        /* DatePicker */
        /* -----------------   DatePicker Angular2 directive  -------------------- */
        this.datePickerConfig = {
            locale: 'it',
            format: 'DD-MM-YYYY'
        };

        $('.dp-picker-input').click(() => {
            if (this.dp2Customized !== true) {
                $('.dp-calendar-wrapper').append("<div class='dp-asap-btn'><a>Test</a></div>");
                this.dp2Customized = true;
                $('.dp-asap-btn').click( () => {
                    this.datePicker.api.close();
                });
            }

        });

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

        selectDate.on('dp.show', function () {
            $('*[data-action="close"]').unbind("click");
            //alert('opened');
            $('*[data-action="close"]').click(function () {
                alert('closed');
                this.reqDate = '';
            });

        });

        selectDate.on('dp.hide', function () {
            //alert('hide');
        });

        // data-action="close"

        /* -----------------   Datetime Picker   -------------------- */
    }


    ngAfterViewInit() {
        //  Activate the tooltips
        $('[rel="tooltip"]').tooltip();
    }
}
