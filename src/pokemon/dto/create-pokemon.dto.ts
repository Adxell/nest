import {ApiProperty} from '@nestjs/swagger/dist'

import { IsString, Min, IsPositive, IsInt } from "class-validator";


export class CreatePokemonDto {

    @ApiProperty({
        description: 'name for pokemon',
        required: false,
        type: Number
    })
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;
    
    @ApiProperty({
        description: 'name for pokemon',
        required: false,
        type: String
    })
    @IsString()
    name: string;
}
