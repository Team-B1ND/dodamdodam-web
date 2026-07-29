export interface Team {
  publicId: string | null;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

export interface CreateTeamRequest {
  name: string;
  description: string;
  imageUrl: string;
}

export interface InviteTeamRequest {
  publicId: string;
  members: string[];
}
