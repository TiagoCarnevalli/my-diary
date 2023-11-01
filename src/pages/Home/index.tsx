import React, { useEffect, useState } from 'react';
import './styles.scss';
import UnburdenBotton from '../../components/UnburdenButton';
import UnburdenComponent from '../../components/UnburdenText';

import { collection, getDocs, query } from 'firebase/firestore';
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
        const querySnapshot = await getDocs(query(collection(dbFirestore, 'unburdens')));
        querySnapshot.forEach((doc: any) => {
            aux.push({id: doc.id, date: doc.data().date, paragraph: doc.data().paragraph });
            console.log('Aux: ', aux);
            console.log(doc.id, ' => ', doc.data());
        });

        setUnburden(aux);
    };

    return (
        <div className="App">
        <div className="App-header">
            <h2>Cantinho do Desabafo</h2>
            <UnburdenBotton 
            unburden={(newUnburden) => setUnburden([...unburden, {id: "Teste", date: new Date().toLocaleString(), paragraph: newUnburden }])}
            />
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
                }} 
            />
            )})}
        </div>
        </div>
    );
}