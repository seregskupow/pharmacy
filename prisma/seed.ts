import { Prisma, PrismaClient, Product } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateAdmins() {
  await prisma.admin.create({
    data: {
      login: 'admin',
      password: 'admin',
    },
  });
}

async function generateCustomers() {
  await prisma.customer.create({
    data: {
      email: faker.internet.email(),
      name: faker.name.findName(),
      avatar: faker.internet.avatar(),
    },
  });
  await prisma.customer.create({
    data: {
      email: faker.internet.email(),
      name: faker.name.findName(),
      avatar: faker.internet.avatar(),
    },
  });
  await prisma.customer.create({
    data: {
      email: faker.internet.email(),
      name: faker.name.findName(),
      avatar: faker.internet.avatar(),
    },
  });
}

async function generateOrderStatus() {
  await prisma.orderStatus.createMany({
    data: [
      {
        name: 'placed',
      },
      {
        name: 'in progress',
      },
      {
        name: 'shipping',
      },
      {
        name: 'delivered',
      },
    ],
  });
}
async function generateManufacturers() {
  await prisma.manufacturer.createMany({
    data: [
      {
        id: 0,
        name: 'Bayer',
        logo: 'https://i.apteka24.ua/blog/Frame+1622+(2).png',
      },
      {
        id: 1,
        name: 'Pfizer',
        logo: 'https://i.apteka24.ua/blog/Frame+1641.png',
      },
      {
        id: 2,
        name: 'Coloplast',
        logo: 'https://i.apteka24.ua/blog/Frame+1617+(2).png',
      },
    ],
  });
}
function generateProducts(amount: number) {
  const products: any[] = [];
  for (let i = 0; i < amount; i++) {
    products.push({
      product: {
        create: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
          image: faker.image.business(250, 250),
          quantity: 69,
          Manufacturer: {
            connect: { id: randomInteger(0, 2) },
          },
        },
      },
    });
  }
  return products;
}
async function generateCategoriesWithProducts() {
  await generateManufacturers();
  const medicamentCategory = await prisma.category.create({
    data: {
      name: 'Medicaments',
      description: '',
      image: faker.image.abstract(),
    },
  });
  const vitaminsCategory = await prisma.category.create({
    data: {
      name: 'Vitamins',
      description: '',
      image: faker.image.abstract(),
    },
  });
  const antibioticsCategory = await prisma.category.create({
    data: {
      name: 'Antibiotics',
      description: '',
      image: faker.image.abstract(),
    },
  });
  const hygieneCategory = await prisma.category.create({
    data: {
      name: 'Hygiene',
      description: '',
      image: faker.image.abstract(),
    },
  });
  const childrenCategory = await prisma.category.create({
    data: {
      name: 'For children',
      description: '',
      image: faker.image.abstract(),
    },
  });
  //SubCategories
  const coldRemediesCategory = await prisma.category.create({
    data: {
      name: 'Cold remedies',
      description: '',
      image: faker.image.abstract(),
      ParentCategory: {
        connect: { id: medicamentCategory.id },
      },
      products: {
        create: [...generateProducts(10)],
      },
    },
  });
  const allergyDedicationsCategory = await prisma.category.create({
    data: {
      name: 'Allergy medications',
      description: '',
      image: faker.image.abstract(),
      ParentCategory: {
        connect: { id: medicamentCategory.id },
      },
      products: {
        create: [...generateProducts(15)],
      },
    },
  });
  const hormonalDrugsCategory = await prisma.category.create({
    data: {
      name: 'Hormonal drugs',
      description: '',
      image: faker.image.abstract(),
      ParentCategory: {
        connect: { id: medicamentCategory.id },
      },
      products: {
        create: [...generateProducts(5)],
      },
    },
  });
  const mineralSupplementsCategory = await prisma.category.create({
    data: {
      name: 'Mineral supplements',
      description: '',
      image: faker.image.abstract(),
      ParentCategory: {
        connect: { id: vitaminsCategory.id },
      },
      products: {
        create: [...generateProducts(25)],
      },
    },
  });
  const fishOilCategory = await prisma.category.create({
    data: {
      name: 'Fish oil and omega 3',
      description: '',
      image: faker.image.abstract(),
      ParentCategory: {
        connect: { id: vitaminsCategory.id },
      },
      products: {
        create: [...generateProducts(10)],
      },
    },
  });
}
async function generateStoreConfig() {
  await prisma.storeConfig.create({
    data: {
      name: 'Pharmacy store',
      logo: faker.image.abstract(250, 250),
      address1: faker.address.streetAddress(),
      description: faker.commerce.productDescription(),
      phone1: faker.phone.phoneNumber(),
    },
  });
}

async function generateBanners() {
  await prisma.sliderBanner.createMany({
    data: [
      ...[].fill(
        {
          image: faker.image.cats(1060, 440),
          title: faker.commerce.productName(),
        },
        0,
        5,
      ),
    ],
  });
}
async function seed() {
  await generateAdmins();
  await generateCustomers();
  await generateOrderStatus();
  await generateCategoriesWithProducts();
  await generateStoreConfig();
  await generateBanners();
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
