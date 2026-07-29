export interface Team {
  publicId: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

export interface TeamMember {
  userId: string;
  name: string;
  profileImage: string | null;
  isOwner: boolean;
  isAccept: boolean;
  student: {
    grade: number;
    room: number;
    number: number;
  };
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
