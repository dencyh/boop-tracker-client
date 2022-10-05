export interface IBug {
  title: string;
  description: string;
  status: string;
  priority: string;
  due: Date;
  assigned_to: number[];
  created_by: number;
  project_id: number;
}
