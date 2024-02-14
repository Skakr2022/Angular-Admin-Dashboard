import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatTableDataSource } from '@angular/material/table';
import { user } from 'src/app/components/shared/models/user.model';
import { UserService } from 'src/app/components/core/services/user.service';
import { TableComponent } from 'src/app/components/shared/components/table/table.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeRoleComponent } from 'src/app/components/shared/components/change-role/change-role.component';
import { catchError, map, startWith, switchMap } from 'rxjs';
import { merge, of as observableOf } from 'rxjs';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent {
    active = true;
    blocked = true;
    isLoadingResults=true;
    isEmpty:boolean=false;
    DataNumber!:number;
    user!:user[];
    hasImage: boolean=false;
    hasAction: boolean;
    filterValue: string;
    dropdownItems: string[]=['Edit'];
    sortActive: string="id";
    endpoint: string="user";
    UserDataSource =new MatTableDataSource<user>(this.user);
    UserDisplayedColumns: string[]=['id','firstName','lastName','email','role.name','action'];
    @ViewChild(TableComponent, { static: true }) table!: TableComponent;

    constructor(
        public themeService: CustomizerSettingsService,
        private userService:UserService,
        private matDialog: MatDialog
        // private table: TableComponent,
    ) {}

    ngOnInit(): void {
        this.loadData();
        this.listData();
        this.table.editEvent.subscribe((data) => this.onEdit(data));

    }

    ngAfterViewInit(){
     this.table.sort.sortChange.subscribe(() => (this.table.paginator.pageIndex = 0));
     merge(this.table.paginator.page,this.table.sort.sortChange) 
     .pipe(
      startWith({}),
      switchMap(() => {
          this.isLoadingResults = true;
          return this.userService
          .findUsers(
            this.table.paginator?.pageIndex ?? 0,
            this.table.paginator?.pageSize ?? 5,
            this.table.sort?.active ?? this.sortActive,
            this.table.sort?.direction ?? "asc")
            .pipe(catchError(() => observableOf(null)));
            
      }),
      map(data => {
          this.isLoadingResults = false;
          return data;
      }),
     )
      .subscribe((data)=>{
        this.UserDataSource = new MatTableDataSource(data.content) ;
      });

      // this.table.sort.sortChange
      //  .subscribe(()=>{
      //   this.UserDataSource = new MatTableDataSource(this.loadData() as any) 
      // }); 
    }

    onEdit(data: any): void {
      
      console.log(data);
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.width = "500px";
      dialogConfig.data = {
        name: "role",
        title: "role",
        actionButtonText: "edit",
        Data: data
      }
  
      const dialogRef = this.matDialog.open(ChangeRoleComponent,dialogConfig);
      dialogRef.afterClosed().subscribe( result => {this.loadData();} )
    
    }

    loadData():void{
        this.userService
        .findUsers(
          this.table.paginator?.pageIndex ?? 0,
          this.table.paginator?.pageSize ?? 5,
          this.table.sort?.active ?? this.sortActive,
          this.table.sort?.direction ?? "asc")
          .subscribe((data)=>{
            console.log(data);
           this.UserDataSource=new MatTableDataSource(data.content);
          // this.ProDataSource.data = data.content ;
          });
      }
    
      listData(){
        console.log("listData");
        this.userService
        .getUsers().subscribe(data=> {
          console.log(data.length);
          this.DataNumber=data.length;
          if(data.length==0){
            this.isEmpty=false;
          }
        })
      }

    applyFilter(event: KeyboardEvent) {
    
        this.filterValue = (event.target as HTMLInputElement).value;
        this.UserDataSource.filter = this.filterValue.trim().toLowerCase();

        this.UserDataSource.filterPredicate = (data: any, filter: string) => {
          const role = JSON.stringify(data.role.name).toLowerCase();
          const email = JSON.stringify(data.email).toLowerCase();
          const fullName = JSON.stringify(data.fullName).toLowerCase();
          const id = JSON.stringify(data.id).toLowerCase();
          filter = filter.toLowerCase(); 
         return      role.includes(filter) 
                  || email.includes(filter) 
                  || fullName.includes(filter) 
                  || id.includes(filter);
       };
   
      }
    
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}


