export class AddedProductDTO {
    name:string=''
    note:string|null=''
    categoryId:number=0
    subCategoryId:number|null=null
    brandId:number=0
    price:number=0
    salePrice:number|null=null
    onSale:boolean=false
    imageOfProduct!:File
    discountDurationInHours!:number|null
}
