import { NbMenuItem } from '@nebular/theme';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuSharedService {
    teamId: number = 0;
    constructor() {
    }

    public DASHBOARD_MENU: NbMenuItem[] = [
        {
            title: 'Dashboard',
            icon: 'home-outline',
            link: '/pages',
            home: true,
            
        },
        {
            title: 'FEATURES',
            group: true,  
        },
        {
            title: 'Products',
            icon: 'shopping-cart-outline',
            children: [
                {
                    title: 'Product Info',
                    link: 'product/product'
                },
                {
                    title: 'Add New Product',
                    link: 'product/new-product'
                }
            ]
        }
    ];
}