import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { dialogData } from '../../models/Dialog-data.model';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CoreService } from 'src/app/components/core/services/core.service';
import { Product } from '../../models/Product.model';
import { ApiService } from 'src/app/components/core/services/api.service';
import { SortingDataAccessorService } from 'src/app/components/core/services/sorting-data-accessor.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit,AfterViewInit {
  @Input() isLoadingResults!:boolean;
  @Input() isEmpty!:boolean;
  @Input() imagePosition!:number;
  @Input() hasImage!:boolean;
  @Input() hasAction!:boolean;
  @Input() displayedColumns!: string[];
  @Input() dataSource!:MatTableDataSource<any>;
  @Input() endpoint!:string;
  @Input() sortActive!:string;
  @Input() Items!:string[];
  @Input() dialogData!:dialogData;
  @Input() Dialog!:any;
  @Input() filterValue!:string;
  @Input() idField!: string;
  @Input() DataNumber:number=0;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  

  products:Product[]=[];
  
  Button:string='more_horiz';
  date!:Date;
  constructor(private datePipe: DatePipe,
              private matDialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer,
              private apiService: ApiService,
              private _coreService: CoreService,
              private sortingService:SortingDataAccessorService
              ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  getValueForColumn(element: any, column: string): any {
    // Handle nested properties
    if (column.includes('.')) {
      const nestedProperties = column.split('.');
      let nestedValue = element;
      for (const prop of nestedProperties) {
        nestedValue = nestedValue[prop];
      }
       return this.formatValue(nestedValue);
    } else {
       return this.formatValue(element[column]);
    }
  }
  
  formatValue(value: any): any {
    if (typeof value === 'number' && value.toString().length >= 13) {
      // Format date using Angular's date pipe
      return this.datePipe.transform(value, 'yyyy/MM/dd');
    } else {
      return value;
    }
  }

  isSortable(column:string){
    return  column === this.displayedColumns[this.displayedColumns.length - 1]? '' : column; 
  }

  openDialogEdit(data:any):void {

    console.log("etst0" + data);
    this.editEvent.emit(data);
  }

  deleteData(data: any){
    this.deleteEvent.emit(data);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
