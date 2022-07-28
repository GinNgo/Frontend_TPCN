export interface Account {
  AccId: number;
  UserId: number;
  Username: string;
  Password: string;

  Role: number;
  Status: boolean;
  CreateDate: string;
  IsDeleted: boolean;
  IsSelected: boolean;
}
