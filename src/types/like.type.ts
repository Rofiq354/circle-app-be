import { AuditFields, ID } from "./common.type";

export interface Like extends AuditFields {
  id: ID;
  user_id: ID;
  thread_id: ID;
}
