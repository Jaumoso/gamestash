import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StorefrontService } from './storefront.service';
import { CreateStorefrontDto } from './dto/create-storefront.dto';
import { sanitizeFilter } from 'mongoose';
import { UpdateStorefrontDto } from './dto/update-storefront.dto';

@ApiTags('Storefront')
@Controller('storefront')
export class StorefrontController {
    constructor(private readonly storefrontService: StorefrontService) {}

    @Get()
    @ApiCreatedResponse({ description: 'All storefronts info.' })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error: Could not get all the users info!'
    })
    async getAllStorefronts() {
        try {
            return await this.storefrontService.getAllStorefronts();
        }
        catch (err) {
            throw new HttpException('Error: Could not get all the storefronts info!', HttpStatus.BAD_REQUEST)
        }
    }

    @Get(':id')
    @ApiCreatedResponse({ description: 'Information about a specific storefront.' })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error: Could not get storefront info!'
    })
    async getStorefront(@Param('id') storefrontId: string) {
        try {
            return await this.storefrontService.getStorefront(storefrontId);
        }
        catch (err) {
            throw new HttpException('Error: Could not get the storefront info!', HttpStatus.BAD_REQUEST)
        }
    }

    @Post('new')
    @ApiCreatedResponse({ description: 'Creates a new storefront.' })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Error: Could not create a new storefront!'
    })
    async createStorefront(@Body() createStorefrontDto: CreateStorefrontDto) {
        try {
            return await this.storefrontService.createStorefront(createStorefrontDto);
        }
        catch (err) {
            throw new HttpException('Error: Could not create a new storefront!', HttpStatus.BAD_REQUEST)
        }
    }

    @Put('update/:id')
    @ApiCreatedResponse({ description: 'Updates a storefront data' })
    async updateStorefront(@Param('id') storefrontId: string, @Body() updateStorefrontDto: UpdateStorefrontDto) {
        try {
            return await this.storefrontService.updateStorefront(storefrontId, sanitizeFilter(updateStorefrontDto));
        }
        catch (err) {
            throw new HttpException('Error: Could not update the storefront!', HttpStatus.BAD_REQUEST)
        }
    }

    @Delete('delete/:id')
    @ApiCreatedResponse({ description: 'Borra una tienda.' })
    async deleteStorefront( @Param('id') storefrontId: string) {
        try {
            return await this.storefrontService.deleteStorefront(storefrontId);
        }
        catch (err) {
            throw new HttpException('Error: Could not delete the storefront!', HttpStatus.BAD_REQUEST)
        }
    }
}
