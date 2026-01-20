import { AuditFields, ID } from "./common.type";

export interface Reply extends AuditFields {
  id: ID;
  user_id: ID;
  thread_id: ID;
  content: string;
  image?: string | null;
}

// REQUEST TYPES

export type CreateReplyDTO = Pick<Reply, "thread_id" | "content" | "image">;
