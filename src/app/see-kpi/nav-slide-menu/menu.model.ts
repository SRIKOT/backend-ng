export interface Menu {
    webpage_group_id: number;
    webpage_group_code: string;
    webpage_group_name: string;
    menu: [MenuDetail];
}

export interface MenuDetail {
    webpage_id: number,
    webpage_group_id: number,
    webpage_name: string;
    webpage_url: string;
    is_active: number;
    created_by: string;
    created_dttm: string;
    updated_by: string;
    updated_dttm: string;
}