export type ID = number;

export interface AuditFields {
  created_at: Date;
  created_by: ID;
  updated_at: Date;
  updated_by: ID;
}
