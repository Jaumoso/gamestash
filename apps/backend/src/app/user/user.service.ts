import { BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserContentDto } from './dto/update-libary-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>){}

    async findUser(username: string): Promise<any> {
        return await this.userModel.findOne({ username: username });
    }

    async getAllUsers(): Promise<UserDocument[]> {
        const userData = await this.userModel.find()
        if (!userData || userData.length == 0) {
            throw new NotFoundException('Users data not found!');
        }
        return userData;
    }

    async createUser(createUserDto: CreateUserDto ): Promise<UserDocument> {
        try{
            this.validateUserDto(createUserDto);

            const existingUser = await this.userModel.findOne({ username: createUserDto.username});
            if (existingUser){
                throw new ConflictException('Username already exists!');
            }

            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
            createUserDto.password = hashedPassword;

            const newUser = await this.userModel.create(createUserDto);
            if (!newUser) {
                throw new NotFoundException('Could not create user!');
              }
            return newUser;
        } 
        catch(error){
            if(error instanceof BadRequestException || error instanceof ConflictException){
                throw error;
            }
            else {
                throw new NotFoundException('Could not create user!');
            }
        }
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
        try {
            this.validateUserDto(updateUserDto);
    
            const existingUser = await this.userModel.findOne({ username: updateUserDto.username, _id: { $ne: userId }});
            if (existingUser) {
                throw new ConflictException('Username already exists!');
            }
    
            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(updateUserDto.password, saltOrRounds);
            updateUserDto.password = hashedPassword;
    
            const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
            if (!updatedUser) {
                throw new NotFoundException('Could not update user!');
            }
            return updatedUser;
        }
        catch (error) {
            if (error instanceof BadRequestException || error instanceof ConflictException) {
                throw error;
            } else {
                throw new NotFoundException('Could not update user!');
            }
        }
    }

    async updateUserContent(userId: string, updateUserContentDto: UpdateUserContentDto) {
        try {
            const { library, ...rest } = updateUserContentDto;
            const updatedUser = await this.userModel.findByIdAndUpdate(
                userId,
                { $set: { library: library }, ...rest },
                { new: true }
            );
    
            if (!updatedUser) {
                throw new NotFoundException('User library not updated!');
            }
            return updatedUser;

        } catch (error) {
            if(error instanceof BadRequestException){
                throw error;
            }
            else {
                throw new NotFoundException('Could not update user library data!')
            }
        }
    }

    async deleteUser(userId: string): Promise<UserDocument> {
        try{
            const deletedUser = await this.userModel.findByIdAndDelete(userId);
            if (!deletedUser) {
                throw new NotFoundException('User not deleted!');
            }
            return deletedUser;
        }
        catch(error){
            if(error instanceof BadRequestException){
                throw error;
            }
            else {
                throw new NotFoundException('Could not delete user!')
            }
        }
        
    }


    private validateUserDto(userDto: CreateUserDto | UpdateUserDto): void {
        if (!userDto.username || !userDto.password) {
          throw new BadRequestException('Username and password are required!');
        }
        if (userDto.username.length < 2) {
            throw new BadRequestException('Username must be more than 2 characters long!');
        }
        if (userDto.username.length > 30) {
            throw new BadRequestException('Username must be less than 30 characters long!');
        }
        if (userDto.password.length < 8) {
          throw new BadRequestException('Password must be at least 8 characters long!');
        }
      }

}
