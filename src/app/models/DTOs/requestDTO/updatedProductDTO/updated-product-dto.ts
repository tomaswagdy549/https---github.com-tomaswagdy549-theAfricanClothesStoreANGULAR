export class UpdatedProductDTO {
    categoryId:number=0
    brandId:number=0
    name:string=""
    price: number = 0
    Id:number=0
    subCategoryId:number|null= null
    onSale:boolean= false
    salePrice:number|null = null
    note: string|null=null
    discountDurationInHours!:number|null
}
