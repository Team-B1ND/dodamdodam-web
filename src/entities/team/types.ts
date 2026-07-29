export interface Team {
  publicId: string;
  name: string;
  imageUrl: string;
}

export interface TeamMember {
  userId: string;
  name: string;
  profileImage: string;
  isOwner: boolean;
  isAccept: boolean;
  student: {
    grade: number;
    room: number;
    number: number;
  };
}
