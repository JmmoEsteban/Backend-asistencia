export interface User{
    user_id: number;
    user_first_name: string;
    user_last_name: string;
    user_email: string;
    user_password: string;
    user_microsoft_id: string;
    user_auth_provider: string;
    user_job_title: string;
    user_department: string;
    user_office_location: string;
    user_mobile_phone: string;
    user_business_phones: string;
    user_permissions: JSON; 
    user_role_id: number;
    user_program_id: number;
    user_status_id: number;
    user_created_at: Date;
}