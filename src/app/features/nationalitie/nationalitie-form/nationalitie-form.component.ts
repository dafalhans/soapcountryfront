import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {nationalitieManager} from "../nationalitie.manager";
import {nationalitieModel} from "../nationalitie.model";
import {JsonPipe} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-nationalitie-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    JsonPipe,
    CalendarModule,
    RippleModule
  ],
  templateUrl: './nationalitie-form.component.html',
  styleUrl: './nationalitie-form.component.css'
})
export class nationalitieFormComponent implements OnInit {

  public readonly nationalitieFields = nationalitieFields;

  nationalitieForm!: FormGroup<nationalitieFormType>;

  constructor(private fb: FormBuilder,
              private dialogRef: DynamicDialogRef,
              protected config: DynamicDialogConfig,
              private nationalitieManager: nationalitieManager) {
  }

  ngOnInit(): void {
    this.nationalitieForm = this.fb.group<nationalitieFormType>(<nationalitieFormType>{
      [nationalitieFields.Id]: this.fb.control({value: '', disabled: !!this.config.data}, Validators.required),
      [nationalitieFields.Name]: this.fb.control(''),
    });

    this.nationalitieForm.patchValue(this.config.data);
  }

  // save() {
  //   console.log(this.nationalitieForm.getRawValue())
  //   let model: nationalitieModel = this.nationalitieForm.getRawValue();
  //   if (this.config.data) {
  //     this.nationalitieManager.update(model);
  //   } else {
  //     this.nationalitieManager.create(model);
  //   }
  //   this.dialogRef.close();
  // }

}

enum nationalitieFields {
  Id = 'id',
  Name = 'name',
}

interface nationalitieFormType {
  [nationalitieFields.Id]: FormControl<string | null>;
  [nationalitieFields.Name]: FormControl<string | null>;
}

