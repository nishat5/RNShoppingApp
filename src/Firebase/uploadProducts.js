// uploadProducts.js
import { db } from './firebaseConfig';
import { collection, setDoc, doc } from 'firebase/firestore';
import { products } from './productsData';

export const uploadProductsToFirestore = async () => {
  try {
    const collectionRef = collection(db, 'products');
    for (const product of products) {
      const docRef = doc(collectionRef, product.id.toString());
      const { id, ...data } = product;
      await setDoc(docRef, data);
      console.log(`✅ Uploaded [ID: ${product.id}]`);
    }
    console.log('🎉 All products uploaded successfully!');
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
};
