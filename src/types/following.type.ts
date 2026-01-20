import { ID } from "./common.type";

export interface Following {
  id: ID;
  follower_id: ID;
  following_id: ID;
  created_at: Date;
  updated_at: Date;
}
