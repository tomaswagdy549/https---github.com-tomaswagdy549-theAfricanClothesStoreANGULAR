


import { 
  Component ,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
 } from '@angular/core';



 import { ProductsService } from '../../services/productsService/products.service';
 import { Product } from '../../models/product/product';
 import { CommonModule } from '@angular/common';
 import { FormsModule } from '@angular/forms';
 import { ProductFilterComponent } from '../product-filter/product-filter.component';
 import { ProductDetailsComponent } from '../product-details/product-details.component';
 

@Component({
  selector: 'app-womenbags',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ProductFilterComponent,
    ProductDetailsComponent,],
  templateUrl: './womenbags.component.html',
  styleUrl: './womenbags.component.css'
})
export class WomenbagsComponent  implements OnInit {
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number[] = [];
  products: Product[] = [];
  sentProduct!: Product;
  @ViewChild('container', { read: ViewContainerRef }) entry:ViewContainerRef;
  productDetailsComponent!:ComponentRef<ProductDetailsComponent>
  constructor(private productsService: ProductsService,private resolver: ViewContainerRef) {
    this.entry=resolver,
    this.cards.forEach(card => {
      this.currentImage[card.id] = card.img;
    });
}


  ngOnInit(): void {
    this.moveToPage(this.pageSize, 1);
  }
  show($event: Product[]) {
    this.products = $event;
  }
  moveToPage(pageSize: number, Page: number) {
    this.entry.clear()
    this.productsService.getAllProducts(pageSize, Page).subscribe({
      next: (res) => {
        this.products = res.products;
        this.currentPage = res['currentPage'];
        this.totalPages = [];
        this.sentProduct = this.products[0];
        this.productDetailsComponent = this.entry.createComponent(ProductDetailsComponent)
        this.productDetailsComponent.setInput('product',this.sentProduct)    
        for (let i = 1; i <= res['totalPages']; i++) {
          this.totalPages.push(i);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  cards = [
    {
      id: 1,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    },
    {
      id: 2,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    },
    {
      id: 3,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    },

    {
      id: 4,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    },{
      id: 5,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    },{
      id: 6,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    },{
      id: 7,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    },{
      id: 8,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    },
    {
      id: 9,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    },{
      id: 10,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    },{
      id: 11,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    },{
      id: 12,
      img: 'assets/images/bagswomen.jpg',
      imgHover: 'assets/images/bagswomen2.jpg',
      text: 'Card 1 description',
      price: 100
    }
 
  ];

  currentImage: { [key: number]: string } = {};


  changeImage(cardId: number, hoverImg: string) {
    this.currentImage[cardId] = hoverImg;
  }

  resetImage(cardId: number, defaultImg: string) {
    this.currentImage[cardId] = defaultImg;
  }
}









