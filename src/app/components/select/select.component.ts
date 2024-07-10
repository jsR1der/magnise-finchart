import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {DataService} from "../../services/data.service";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    MatSelect,
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatOption,
    NgIf
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit {

  constructor(public selectSectionService: DataService, public httpService: HttpService) {
  }

  ngOnInit() {
  }


}
