import { IsMongoId, IsNotEmpty } from "class-validator";

export class UserInfoDTO{

    @IsNotEmpty()
    @IsMongoId()
    public _id: string;

    @IsNotEmpty()
    public firstname: string;

    @IsNotEmpty()
    public lastname: string;
}