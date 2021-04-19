import { products } from './data';

export async function insertSeedData(ks: any) {
  // Keystone API changed, so we need to check for both versions to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.PrismaAdapter || keystone.adapter;

  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
  const { prisma } = adapter;

  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`);

    const { id } = await prisma.productImage.create({
      data: { image: product.photo, altText: product.description },
    });

    product.photo = id;

    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        photoId: product.photo,
        status: product.status,
      },
    });
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log('👋 Please start the process with `yarn dev` or `npm run dev`');
  process.exit();
}
