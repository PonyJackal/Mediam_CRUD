import { User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class UserEntity implements User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;
  
    @ApiProperty()
    password: string;
  
    @ApiProperty()
    approved: boolean;
  
    @ApiProperty()
    createdAt: Date;
  
    @ApiProperty()
    updatedAt: Date;
}
