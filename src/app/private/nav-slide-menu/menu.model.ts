export interface Menu {
    page_group_id: number;
    seq_no: Number;
    page_group_code: string;
    page_group_name: string;
    is_active: number;
    created_by: string;
    created_dttm: string;
    updated_by: string;
    updated_dttm: string;
    menu: [MenuDetail];
}

export interface MenuDetail {
    page_id: number;
    seq_no: Number;
    page_group_id: number;
    page_name: string;
    page_url: string;
    is_active: number;
    created_by: string;
    created_dttm: string;
    updated_by: string;
    updated_dttm: string;
}