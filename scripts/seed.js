import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { readFileSync } from 'fs';

const firebaseConfig = {
  apiKey: 'AIzaSyCI-_rgXH0f7RP7g0Zezrj7pEEpvabIvnc',
  authDomain: 'player-2-5010e.firebaseapp.com',
  projectId: 'player-2-5010e',
  storageBucket: 'player-2-5010e.firebasestorage.app',
  messagingSenderId: '848929048076',
  appId: '1:848929048076:web:cd039485ff56bdabbb9029',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productos = JSON.parse(readFileSync('./public/data/productos.json', 'utf-8'));

const existentes = await getDocs(collection(db, 'productos'));
if (!existentes.empty) {
  console.log('La colección "productos" ya tiene datos. No se sembró nada.');
  process.exit(0);
}

for (const producto of productos) {
  const datos = { ...producto };
  delete datos.id;
  await addDoc(collection(db, 'productos'), datos);
  console.log('Agregado:', datos.nombre);
}

console.log('Seed completo.');
process.exit(0);
