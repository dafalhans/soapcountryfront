import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {nationalitieService} from "./nationalitie.service";
import {nationalitieManager} from "./nationalitie.manager";
import {nationalitieModel} from "./nationalitie.model";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogService} from "primeng/dynamicdialog";
import {nationalitieFormComponent} from "./nationalitie-form/nationalitie-form.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {countrieComponent} from "../countrie/countrie.component";
import {countrieModel} from "../countrie/countrie.model";

interface Column {
  field: string,
  header: string,
  type: CellType,
  country?: countrieModel // not a required field
}

enum CellType {
  TEXT,
  DATE,
  COUNTRY
}

@Component({
  selector: 'app-nationalitie',
  standalone: true,
  imports: [
    HttpClientModule,
    AsyncPipe,
    JsonPipe,
    TableModule,
    CommonModule,
    ButtonModule,
    nationalitieFormComponent,
    ConfirmDialogModule,
    ToastModule,
    countrieComponent
  ],
  providers: [
    nationalitieService,
    DialogService,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './nationalitie.component.html',
  styleUrl: './nationalitie.component.css'
})
export class nationalitieComponent implements OnInit {

  protected readonly CellType = CellType;

  all$ = this.nationalitieManager.all$;
  current$ = this.nationalitieManager.current$;

  inputCountries: string[] = ['BEL', 'FRA', 'EGY','DEU'];
  countries$ = this.nationalitieManager.countries$;

  cols!: Column[];

  constructor(private nationalitieManager: nationalitieManager,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    // this.nationalitieManager.getAll();

    this.nationalitieManager.getAllCountries(this.inputCountries);

    this.cols = [
      {
        field: 'id',
        header: 'ID',
        type: CellType.TEXT
      },
      {
        field: 'name',
        header: 'NAME',
        type: CellType.COUNTRY,
      },
      {
        field: 'creationDate',
        header: 'CREATE DATE',
        type: CellType.DATE
      },
      {
        field: 'modificationDate',
        header: 'Modification DATE',
        type: CellType.DATE
      }
    ];
  }

  edit(rowData: nationalitieModel) {
    console.log('Edit ' + rowData.id);
    this.dialogService.open(nationalitieFormComponent, {
      header: 'Edit nationalitie',
      width: '30vw',
      data: rowData
    });
  }

  // confirmedDelete(rowData: nationalitieModel) {
  //   console.log('Delete ' + rowData.id);
  //   this.confirmationService.confirm({
  //     message: 'Please confirm to proceed moving forward.',
  //     icon: 'pi pi-exclamation-circle',
  //     acceptIcon: 'pi pi-check mr-1',
  //     rejectIcon: 'pi pi-times mr-1',
  //     rejectButtonStyleClass: 'p-button-danger p-button-sm',
  //     acceptButtonStyleClass: 'p-button-outlined p-button-sm',
  //     accept: () => {
  //       this.nationalitieManager.delete(rowData.id!);
  //       this.messageService.add({
  //         severity: 'info',
  //         summary: 'Confirmed',
  //         detail: 'Deleted nationalitie id = ' + rowData.id,
  //         life: 3000
  //       });
  //     },
  //     reject: () => {
  //       this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
  //     }
  //   });
  // }

  createNew() {
    console.log('New nationalitie');
    this.dialogService.open(nationalitieFormComponent, {
      header: 'New nationalitie',
      width: '30vw'
    });
  }

  view(rowData: nationalitieModel) {
    console.log('View ' + rowData.id);
    this.nationalitieManager.getById(rowData.id!);
    this.messageService.add({
      severity: 'info',
      summary: 'GetById',
      detail: 'Get nationalitie id = ' + rowData.id,
      life: 3000
    });
  }

  onHover(value: any, type: CellType) {
    if (type === CellType.COUNTRY) {
      // Handle hover over country cell
      console.log('Hovering over country:', value);
      this.showCountryDetails(value);
      // Optionally, you can emit an event or perform any other action here
    }
  }

  showCountryDetails(countryName: string) {
    // Navigate to another component to show country details
    // Implement your navigation logic here
    console.log('from within the showCountryDetails');
  }

}

