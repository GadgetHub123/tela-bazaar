import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();

  const products = [
    // FABRICS
    { name: "Katsa White", description: "Manipis na puting katsa, perpekto sa mga damit at proyekto.", price: 45.00, stock: 200, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1606503153255-59d5e417b6f9?w=400&fit=crop" },
    { name: "Maong Denim Blue", description: "Matibay na denim tela para sa mga pants at jackets.", price: 120.00, stock: 150, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&fit=crop" },
    { name: "Satin Ivory", description: "Makintab na satin tela para sa mga formal na damit.", price: 180.00, stock: 100, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&fit=crop" },
    { name: "Cotton Stripe", description: "Comfortable na cotton na may stripe pattern.", price: 85.00, stock: 180, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&fit=crop" },
    { name: "Linen Beige", description: "Natural na linen tela, breathable at magaan.", price: 150.00, stock: 120, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&fit=crop" },
    { name: "Velvet Maroon", description: "Malambot na velvet tela para sa mga eleganteng damit.", price: 250.00, stock: 80, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&fit=crop" },
    { name: "Silk Light Pink", description: "Manipis at makintab na silk tela para sa blouse at dress.", price: 320.00, stock: 60, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&fit=crop" },
    { name: "Checkered Cotton", description: "Classic na checkered pattern, para sa mga polo at shorts.", price: 95.00, stock: 160, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&fit=crop" },
    { name: "Floral Chiffon", description: "Magaan na chiffon na may floral print, para sa mga dress.", price: 135.00, stock: 140, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=400&fit=crop" },
    { name: "Wool Gray", description: "Mainit na wool tela para sa mga jacket at blazer.", price: 280.00, stock: 70, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&fit=crop" },
    { name: "Canvas Brown", description: "Matibay na canvas tela para sa mga bag at accessories.", price: 110.00, stock: 130, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&fit=crop" },
    { name: "Organza White", description: "Manipis at transparent na organza para sa mga bridal.", price: 200.00, stock: 90, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1606503153255-59d5e417b6f9?w=400&fit=crop" },
    { name: "Denim Black", description: "Itim na denim tela para sa mga modernong damit.", price: 130.00, stock: 110, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&fit=crop" },
    { name: "Tweed Cream", description: "Classic na tweed tela para sa mga blazer at coat.", price: 310.00, stock: 50, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&fit=crop" },
    { name: "Jersey Knit Navy", description: "Stretch jersey knit para sa mga comfortable na damit.", price: 90.00, stock: 170, category: "Fabrics", imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&fit=crop" },

    // CLOTHING
    { name: "Barong Tagalog", description: "Tradisyonal na Pilipinong damit para sa mga espesyal na okasyon.", price: 850.00, stock: 50, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&fit=crop" },
    { name: "Palda Floral", description: "Magandang floral na palda para sa pang-araw-araw.", price: 350.00, stock: 80, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&fit=crop" },
    { name: "Polo Shirt White", description: "Klasikong puting polo shirt, angkop sa lahat ng okasyon.", price: 299.00, stock: 120, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&fit=crop" },
    { name: "Malong Mindanao", description: "Tradisyonal na malong mula Mindanao, may makulay na disenyo.", price: 450.00, stock: 60, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&fit=crop" },
    { name: "Terno Formal", description: "Pormal na Filipiniana terno para sa mga espesyal na okasyon.", price: 1200.00, stock: 30, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&fit=crop" },
    { name: "Casual Dress Floral", description: "Magaang na floral dress para sa pang-araw-araw na suot.", price: 420.00, stock: 75, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&fit=crop" },
    { name: "Linen Pants Beige", description: "Comfortable na linen pants para sa mainit na panahon.", price: 580.00, stock: 65, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&fit=crop" },
    { name: "Duster Dress", description: "Maluwag at comfortable na duster dress para sa bahay.", price: 280.00, stock: 100, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&fit=crop" },
    { name: "Kids Camisa", description: "Magandang camisa para sa mga bata, angkop sa fiesta.", price: 320.00, stock: 85, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&fit=crop" },
    { name: "Blazer Cotton Gray", description: "Smart casual na gray blazer para sa opisina at miting.", price: 950.00, stock: 40, category: "Clothing", imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&fit=crop" },

    // SINULID
    { name: "Sinulid Puti", description: "Matibay na puting sinulid para sa pananahi.", price: 25.00, stock: 500, category: "Sinulid", imageUrl: "https://images.unsplash.com/photo-1624456735729-03594a40c065?w=400&fit=crop" },
    { name: "Sinulid Itim", description: "Matibay na itim na sinulid para sa pananahi.", price: 25.00, stock: 500, category: "Sinulid", imageUrl: "https://images.unsplash.com/photo-1624456735729-03594a40c065?w=400&fit=crop" },
    { name: "Sinulid Pula", description: "Maliwanag na pulang sinulid para sa dekorasyon at pananahi.", price: 25.00, stock: 400, category: "Sinulid", imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=400&fit=crop" },
    { name: "Sinulid Asul", description: "Magandang asul na sinulid para sa embroidery at pananahi.", price: 25.00, stock: 400, category: "Sinulid", imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=400&fit=crop" },
    { name: "Sinulid Ginto", description: "Makintab na gintong sinulid para sa embroidery.", price: 45.00, stock: 300, category: "Sinulid", imageUrl: "https://images.unsplash.com/photo-1624456735729-03594a40c065?w=400&fit=crop" },
    { name: "Sinulid Multicolor Set", description: "Set ng 12 kulay na sinulid para sa lahat ng proyekto.", price: 120.00, stock: 200, category: "Sinulid", imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=400&fit=crop" },
    { name: "Elastic Thread", description: "Nababanat na elastic thread para sa mga stretch na damit.", price: 55.00, stock: 250, category: "Sinulid", imageUrl: "https://images.unsplash.com/photo-1624456735729-03594a40c065?w=400&fit=crop" },
    { name: "Embroidery Floss Set", description: "Set ng 20 kulay na embroidery floss para sa cross stitch.", price: 180.00, stock: 150, category: "Sinulid", imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=400&fit=crop" },
    { name: "Wool Yarn Cream", description: "Malambot na wool yarn para sa knitting at crochet.", price: 95.00, stock: 180, category: "Sinulid", imageUrl: "https://images.unsplash.com/photo-1624456735729-03594a40c065?w=400&fit=crop" },
    { name: "Cotton Thread Spool", description: "Malaking spool ng cotton thread para sa mabilis na pananahi.", price: 75.00, stock: 300, category: "Sinulid", imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=400&fit=crop" },

    // ACCESSORIES
    { name: "Gunting Tela", description: "Matalas na gunting para sa pagputol ng tela.", price: 150.00, stock: 75, category: "Accessories", imageUrl: "https://images.unsplash.com/photo-1619641901535-f42706ea3a08?w=400&fit=crop" },
    { name: "Karayom Set", description: "Set ng iba't ibang laki ng karayom para sa pananahi.", price: 55.00, stock: 200, category: "Accessories", imageUrl: "https://images.unsplash.com/photo-1606503153255-59d5e417b6f9?w=400&fit=crop" },
    { name: "Measuring Tape", description: "5-metro na measuring tape para sa tamang sukat ng tela.", price: 35.00, stock: 300, category: "Accessories", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&fit=crop" },
    { name: "Zipper Set 10pcs", description: "Set ng 10 piraso na zipper sa iba't ibang kulay.", price: 80.00, stock: 150, category: "Accessories", imageUrl: "https://images.unsplash.com/photo-1619641901535-f42706ea3a08?w=400&fit=crop" },
    { name: "Button Assortment", description: "100 piraso na buttons sa iba't ibang kulay at laki.", price: 65.00, stock: 200, category: "Accessories", imageUrl: "https://images.unsplash.com/photo-1606503153255-59d5e417b6f9?w=400&fit=crop" },
    { name: "Sewing Pins 50pcs", description: "Matulis na sewing pins para sa pag-aayos ng tela bago tahiin.", price: 40.00, stock: 250, category: "Accessories", imageUrl: "https://images.unsplash.com/photo-1619641901535-f42706ea3a08?w=400&fit=crop" },
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log("Seeded " + products.length + " products with proper images!");
}

main().catch(console.error).finally(() => prisma.$disconnect());