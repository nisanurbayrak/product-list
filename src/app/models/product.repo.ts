import { Product } from './product';
//model tanımlayarak türlerini belirleyeceğiz

export class ProductRepo {
  private products: Product[] = [
    {
      id: 1,
      price: 20000,
      name: 'iphone 15',
      isActive: true,
      image: 'https://cdn.akakce.com/z/apple/iphone-15.jpg',
      text: 'telefon 15',
      desc: 'Model: iPhone 12\nEkran: 6.1 inç, Super Retina XDR display\nÇözünürlük: 2532 x 1170 piksel\nYonga Seti: A14 Bionic chip\nArka Kamera: 12 MP (geniş ve ultra geniş)',
      categoryId: 1,
    },

    {
      id: 2,
      price: 30000,
      name: 'iphone 16',
      isActive: true,
      image: 'https://cdn.akakce.com/z/apple/iphone-16-128-gb-pembe.jpg',
      text: 'telefon 16',
      desc: 'Model: iPhone 12\nEkran: 6.1 inç, Super Retina XDR display\nÇözünürlük: 2532 x 1170 piksel\nYonga Seti: A14 Bionic chip\nArka Kamera: 12 MP (geniş ve ultra geniş)',
      categoryId: 1,
    },
    {
      id: 3,
      price: 10000,
      name: 'iphone 12',
      isActive: true,
      image: 'https://cdn.akakce.com/z/apple/iphone-12-128-gb-mor.jpg',
      text: 'telefon 16',
      desc: 'Model: iPhone 12\nEkran: 6.1 inç, Super Retina XDR display\nÇözünürlük: 2532 x 1170 piksel\nYonga Seti: A14 Bionic chip\nArka Kamera: 12 MP (geniş ve ultra geniş)',
      categoryId: 1,
    },
    {
      id: 4,
      price: 10000,
      name: 'macbook air m2',
      isActive: true,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxIflO5bAuyqGr5kwI2pShRcUC9b_wyaDEPTmLW5_GpwhD8JUHTRdIMFTz10rHPm_-oaA&usqp=CAU',
      text: 'laptop',
      desc: 'Model: iPhone 12\nEkran: 6.1 inç, Super Retina XDR display\nÇözünürlük: 2532 x 1170 piksel\nYonga Seti: A14 Bionic chip\nArka Kamera: 12 MP (geniş ve ultra geniş)',
      categoryId: 2,
    },
  ];
  getProducts() {
    return this.products.filter((p) => p.isActive);
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((p) => p.id == id);
  }

  getProductsByCategoryId(id: number): Product[] {
    return this.products.filter((p) => p.categoryId == id);
  }
}
