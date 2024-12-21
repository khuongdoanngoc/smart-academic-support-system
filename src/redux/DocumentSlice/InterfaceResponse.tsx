export interface DocumentResponse {
    doc_id: number;
    title: string;
    description: string;
    content: string;
    type: string;
    account_id: number;
    file_path: string;
    file_size: number;
    created_at: string;
    updated_at: string;
    folder_id: number;
}

export interface DocumentByAccountRequest{
    email: string;
    pageSize: number;
    pageNum: number;
}