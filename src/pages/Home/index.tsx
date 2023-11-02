import React, { useEffect, useState } from 'react';
import './styles.scss';
import UnburdenBotton from '../../components/UnburdenButton';
import UnburdenComponent from '../../components/UnburdenText';

import { collection, getDocs, query, doc, deleteDoc, orderBy, setDoc } from 'firebase/firestore';
import { dbFirestore } from '../../api/firebase';

type Unburden = {
    id: string,
    date: string,
    paragraph: string
}

export default function Home() {
    const [unburden, setUnburden] = useState<Unburden[]>([]);

    useEffect(() => {
        getUnburdens();
    }, []);

    async function getUnburdens() {
        let aux: Unburden[] = []
        const querySnapshot = await getDocs(query(collection(dbFirestore, 'unburdens'), orderBy('date')));
        querySnapshot.forEach((doc: any) => {
            aux.unshift({id: doc.id, date: doc.data().date, paragraph: doc.data().paragraph });
        });

        setUnburden(aux);
    };

    async function addUnburden(text: string) {
        let idAux: string = new Date().valueOf().toString();
        await setDoc(doc(dbFirestore, 'unburdens', idAux), {
            date: new Date().toLocaleString(),
            paragraph: text
        });

        setUnburden([
            {
                id: idAux,
                date: new Date().toLocaleString(), 
                paragraph: text 
            },
            ...unburden
        ]);
    };

    async function deleteUnburden(id: string) {
        await deleteDoc(doc(dbFirestore, 'unburdens', id));
    }

    return (
        <div className="App">
        <div className="App-header">
            <h2>Cantinho do Desabafo</h2>
            <UnburdenBotton unburden={(newUnburden) => {addUnburden(newUnburden);}}/>
        </div>
        <div className="App-body">
            {unburden.map((u, i) => { return (
            <UnburdenComponent 
                key={u.id} 
                index={i} 
                item={u} 
                deleteFunc={(index) => {
                    let auxArray = [...unburden];
                    
                    auxArray.splice(index, 1);
                    
                    setUnburden(auxArray);
                    deleteUnburden(u.id);
                }} 
            />
            )})}
        </div>
        </div>
    );
}