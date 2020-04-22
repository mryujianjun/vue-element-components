import {ElMenu} from 'element-ui/types/menu';
import {ElMenuItem} from 'element-ui/types/menu-item';

export declare class IMenu extends ElMenu {
    data: IMenuData[];
    height: string;
}

export declare class IMenuItem extends ElMenuItem {
    data: IMenuItemData;
}

export interface IMenuData {
    [index: number]: IMenuItemData
}

export interface IMenuItemData extends ElMenuItem {
    name: string; // 路由名
    index: string;
    icon?: string; // ICON
    children: IMenuData[];
    
    [propName: string]: any; // 额外的属性
}
