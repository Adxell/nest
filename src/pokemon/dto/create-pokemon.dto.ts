import { IsString, Min, IsPositive, IsInt } from "class-validator";

export class CreatePokemonDto {
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    @IsString()
    name: string;
}
