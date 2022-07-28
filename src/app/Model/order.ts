export interface Order {
  OrderId: number;
  CustomerId: number;
  OrderDate: string;
  Total: number;
  Period: string;
  Note: string;
  Status: boolean;
  IsDeleted: number;
  isSelected: boolean;
}
export interface OrderExport {
  OrderId: number;
  Fullname: string;
  Address: string;
  Phone: string;
  Email: string;
  OrderDate: string;
  Total: number;
  Period: string;
  Note: string;
}
