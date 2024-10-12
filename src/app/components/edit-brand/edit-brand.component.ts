import { Component } from '@angular/core';
import { BrandsService } from '../../services/brandsService/brands.service';
import { Brand } from '../../models/brand/brand';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddedBrandDTO } from '../../models/DTOs/requestDTO/addedBrandDTO/added-brand-dto';
import { UpdatedBrandDTO } from '../../models/DTOs/requestDTO/updatedBrandDTO/updated-brand-dto';

@Component({
  selector: 'app-edit-brand',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-brand.component.html',
  styleUrl: './edit-brand.component.css',
})
export class EditBrandComponent {
  brands: Brand[] = [];
  showBrandAdd: boolean = false;
  newBrand: string = '';
  constructor(private brandService: BrandsService) {
    this.brandService.getAllBrands(50, 1).subscribe((response) => {
      this.brands = response.brands;
    });
  }
  addBrand() {
    let addedBrandDTO: AddedBrandDTO = {
      name: this.newBrand,
    };
    this.brandService.addBrand(addedBrandDTO).subscribe({
      next: (response) => {
        this.brands.push(response.entity);
        this.newBrand = '';
      },
    });
  }
  editBrand(brand: Brand) {
    let updatedBrandDTO: UpdatedBrandDTO = {
      name: brand.name,
      Id: brand.id,
    };
    this.brandService.updateBrand(updatedBrandDTO).subscribe({});
  }
  deleteBrand(brandId: number) {
    this.brandService.deleteBrand(brandId).subscribe({
      next: (response) => {
        this.brands = this.brands.filter((brand) => brand.id !== brandId);
      },
    });
  }
}
