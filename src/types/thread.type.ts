import { AuditFields, ID } from "./common.type";

export interface Thread extends AuditFields {
  id: ID;
  content: string;
  image?: string | null;
  number_of_replies: number;
}

// REQUEST TYPES

export type CreateThreadDTO = Pick<Thread, "content" | "image">;

export type UpdateThreadDTO = Partial<Pick<Thread, "content" | "image">>;
