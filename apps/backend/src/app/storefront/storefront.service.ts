import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StorefrontDocument } from './schema/storefront.schema';
import { CreateStorefrontDto } from './dto/create-storefront.dto';
import { UpdateStorefrontDto } from './dto/update-storefront.dto';

@Injectable()
export class StorefrontService {
    constructor(@InjectModel('Storefront') private storefrontModel:Model<StorefrontDocument>) { }

    async getAllStorefronts(): Promise<StorefrontDocument[]> {
        try {
            const storefrontData = await this.storefrontModel.find()
            if (!storefrontData || storefrontData.length == 0) {
                throw new NotFoundException('Storefront data not found!');
            }
            return storefrontData;
        }
        catch(error) {
            if(error instanceof BadRequestException){
                throw error;
            }
            else {
                throw new NotFoundException('Storefront data not found!');
            }
        }
    }

    async getStorefront(storefrontId: string): Promise<StorefrontDocument> {
        try {
            const storefrontData = await this.storefrontModel.findById(storefrontId);
            if (!storefrontData) {
                throw new NotFoundException('Storefront data not found!');
            }
            return storefrontData;
        }
        catch (error) {
            if(error instanceof BadRequestException){
                throw error;
            }
            else {
                throw new NotFoundException('Storefront data not found!');
            }
        }
    }

    async createStorefront(storefrontDto: CreateStorefrontDto ): Promise<StorefrontDocument> {
        try {
            const newStorefront = await this.storefrontModel.create(storefrontDto);
            if (!newStorefront) {
                throw new NotFoundException('Could not create storefront!');
            }
            return newStorefront;
        }
        catch(error) {
            if(error instanceof BadRequestException){
                throw error;
            }
            else {
                throw new NotFoundException('Storefront not created!');
            }
        }
    }

    async updateStorefront(storefrontId: string, updateStorefrontDto: UpdateStorefrontDto) {
        try {
            const updatedStorefront = await this.storefrontModel.findByIdAndUpdate(storefrontId, updateStorefrontDto);
            if (!updatedStorefront) {
                throw new NotFoundException('Storefront not updated!');
            }
            return updatedStorefront;
        }
        catch(error) {
            if(error instanceof BadRequestException){
                throw error;
            }
            else {
                throw new NotFoundException('Storefront not updated!');
            }
        }
    }

    async deleteStorefront(storefrontId: string): Promise<StorefrontDocument> {
        try {
            const deletedStorefront = await this.storefrontModel.findByIdAndDelete(storefrontId);
            if (!deletedStorefront) {
                throw new NotFoundException(`Storefront #${storefrontId} not found`);
            }
            return deletedStorefront;
        }
        catch(error) {
            if(error instanceof BadRequestException){
                throw error;
            }
            else {
                throw new NotFoundException('Storefront not deleted!');
            }
        }
    }
}
