import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../header/toggle.service';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { OrderService } from '../../core/services/order.service';
import { UserService } from '../../core/services/user.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    panelOpenState = false;
    
    isToggled = false;

    productNumber!:number;
    categoryNumber!:number;
    orderNumber!:number;
    userNumber!:number;

    constructor(
        private toggleService: ToggleService,
        public themeService: CustomizerSettingsService,
        public productService: ProductService,
        public categoryService: CategoryService,
        public orderService: OrderService,
        public userService: UserService
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }
    ngOnInit(): void {
        this.productService.getProducts().subscribe((data) => {
            this.productNumber = data.length;
        });

        this.categoryService.getCategories().subscribe((data) => {
            this.categoryNumber = data.length;
        });

        this.orderService.getOrders().subscribe((data) => {
            this.orderNumber = data.length;
        });

        this.userService.getUsers().subscribe((data) => {
            this.userNumber = data.length;
        });
    }


    toggleSetting(){
       this.themeService.toggle();
    }  

    toggle() {
        this.toggleService.toggle();
    }

    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

}