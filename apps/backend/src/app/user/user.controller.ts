import { Body, ConflictException, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';
import { sanitizeFilter } from 'mongoose';
import { UpdateUserContentDto } from './dto/update-libary-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    @ApiCreatedResponse({ description: 'Toda la información de los usuarios.' })
    async getUsers(@Res() response) {
        try {
            const userData = await this.userService.getAllUsers();
            return response.status(HttpStatus.OK).json({
                message: 'All users data found successfully', userData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Post('new')
    @ApiCreatedResponse({ 
        description: 'Creation of a new user in the database.',
        type: CreateUserDto
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error: User not created!'
    })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
        try {
            return await this.userService.createUser(createUserDto);
        }
        catch (err) {
            throw new HttpException('Error: User not created!', HttpStatus.BAD_REQUEST)
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ 
        description: 'Updates the user info.',
        type: UpdateUserDto
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error: User not updated!'
    })
    async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
        try {
            const updatedUser = await this.userService.updateUser(userId, sanitizeFilter(updateUserDto));
            return updatedUser;
        }
        catch (err) {
            if (err instanceof NotFoundException) {
                throw new HttpException(err.message, HttpStatus.NOT_FOUND);
            } else if (err instanceof ConflictException) {
                throw new HttpException(err.message, HttpStatus.CONFLICT);
            } else {
                throw new HttpException('Error: User not updated!', HttpStatus.BAD_REQUEST);
            }
        }
    }

    @Put('update/content/:id')
    @ApiCreatedResponse({ 
        description: 'Updates the content of the user library.',
        type: UpdateUserContentDto
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error: User content not updated!'
    })
    async updateUserContent(@Param('id') userId: string, @Body() updateUserContent: UpdateUserContentDto): Promise<UpdateUserDto> {
        try {
            return await this.userService.updateUserContent(userId, sanitizeFilter(updateUserContent));
        }
        catch (err) {
            throw new HttpException('Error: User content not updated!', HttpStatus.BAD_REQUEST)
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'Deletes a user (its account, basically).' })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error: User not deleted!'
    })
    async deleteUser(@Param('id') userId: string) {
        try {
            return await this.userService.deleteUser(userId);
        }
        catch (err) {
            throw new HttpException('Error: User not deleted!', HttpStatus.BAD_REQUEST)
        }
    }

}
