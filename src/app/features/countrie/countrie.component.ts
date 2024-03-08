import {Component, Input, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {countrieService} from "./countrie.service";
import {countrieManager} from "./countrie.manager";
import {countrieModel} from "./countrie.model";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

interface Column {
  field: string,
  header: string,
  type: CellType,
}

enum CellType {
  TEXT,
  DATE
}

@Component({
  selector: 'app-countrie',
  standalone: true,
  imports: [
    HttpClientModule,
    AsyncPipe,
    JsonPipe,
    TableModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    countrieService,
    DialogService,
    ConfirmationService,
    MessageService
  ],
  templateUrl: './countrie.component.html',
  styleUrl: './countrie.component.css'
})
export class countrieComponent implements OnInit {
// export class countrieComponent{

  protected readonly CellType = CellType;

  all$ = this.countrieManager.all$;
  current$ = this.countrieManager.current$;

  cols!: Column[];

  // @Input() public id?: string;
  // @Input() country: countrieModel | undefined;
  @Input() country!: string;
  showOverlay = false;

  constructor(private countrieManager: countrieManager,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    console.log(this.current$.value);
  //   // console.log(this.country);
  //   this.countrieManager.getAll();
  //   // this.countrieManager.getById("BEL");
  //   // if (this.country) {
  //   //   console.log("text initial"+ this.country);
  //     this.countrieManager.getById(""+this.country);
  //   // }
  //   // if (this.country && this.country.id) {
  //   //   console.log("text "+ this.country);
  //   // }
    this.countrieManager.getById(this.country);
    // this.countrieManager.getAll(""+ this.country$);
  //
    this.cols = [
      {
        field: 'id',
        header: 'ID',
        type: CellType.TEXT
      },
      {
        field: 'name',
        header: 'NAME',
        type: CellType.TEXT
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
      },
      {
        field: 'capital',
        header: 'Capital',
        type: CellType.TEXT
      },
      {
        field: 'currency',
        header: 'Currenct',
        type: CellType.TEXT
      },
      {
        field: 'phonePrefix',
        header: 'Phone Prefix',
        type: CellType.TEXT
      }
      ,
      {
        field: 'flagLocation',
        header: 'Flag Source Location',
        type: CellType.TEXT
      }
      ,
      {
        field: 'flagB64',
        header: 'Flag',
        type: CellType.TEXT
      }
    ];
  }

  // edit(rowData: countrieModel) {
  //   console.log('Edit ' + rowData.id);
  //   this.dialogService.open(countrieFormComponent, {
  //     header: 'Edit countrie',
  //     width: '30vw',
  //     data: rowData
  //   });
  // }

  // confirmedDelete(rowData: countrieModel) {
  //   console.log('Delete ' + rowData.id);
  //   this.confirmationService.confirm({
  //     message: 'Please confirm to proceed moving forward.',
  //     icon: 'pi pi-exclamation-circle',
  //     acceptIcon: 'pi pi-check mr-1',
  //     rejectIcon: 'pi pi-times mr-1',
  //     rejectButtonStyleClass: 'p-button-danger p-button-sm',
  //     acceptButtonStyleClass: 'p-button-outlined p-button-sm',
  //     accept: () => {
  //       this.countrieManager.delete(rowData.id!);
  //       this.messageService.add({
  //         severity: 'info',
  //         summary: 'Confirmed',
  //         detail: 'Deleted countrie id = ' + rowData.id,
  //         life: 3000
  //       });
  //     },
  //     reject: () => {
  //       this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
  //     }
  //   });
  // }

  // createNew() {
  //   console.log('New countrie');
  //   this.dialogService.open(countrieFormComponent, {
  //     header: 'New countrie',
  //     width: '30vw'
  //   });
  // }

  view(rowData: countrieModel) {
    console.log('View ' + rowData.id);
    this.countrieManager.getById(rowData.id!);
    this.messageService.add({
      severity: 'info',
      summary: 'GetById',
      detail: 'Get countrie id = ' + rowData.id,
      life: 3000
    });
  }

}

