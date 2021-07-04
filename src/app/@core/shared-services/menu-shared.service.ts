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
                ,
                {
                    title: 'Offers',
                    link: 'product/new-product'
                }
            ]
        },
        {
            title: 'Data Manager',
            icon: 'shopping-cart-outline',
            children: [
                {
                    title: 'Brands',
                    link: 'brands'
                },
                {
                    title: 'Categories',
                    link: 'categories'
                },
                {
                    title: 'Classifcations',
                    link: 'classifcations'
                },
                {
                    title: 'Grades',
                    link: 'grades'
                }
            ]
        },
        {
            title: 'Orders',
            icon: 'shopping-cart-outline',
            link: 'product/product'
        },
        {
            title: 'Selling requests',
            icon: 'shopping-cart-outline',
            link: 'product/product'
        },
        {
            title: 'Accounts',
            icon: 'shopping-cart-outline',
            link: 'product/product'
        },
        {
            title: 'Notifications',
            icon: 'shopping-cart-outline',
            link: 'product/product'
        }
    ];
}