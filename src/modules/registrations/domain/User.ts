export interface User{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    microsoft_id: string;
    auth_provider: string;
    job_title: string;
    department: string;
    office_location: string;
    mobile_phone: string;
    business_phones: string;
    permissions: JSON; 
    role_id: number;
    program_id: number;
    status_id: number;
    created_at: Date;
}