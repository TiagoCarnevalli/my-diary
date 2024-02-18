import React, { useEffect, useState } from 'react';
import './styles.scss';
import UnburdenBotton from '../../components/UnburdenButton';
import UnburdenComponent from '../../components/UnburdenText';
import { 
    FiCode
} from 'react-icons/fi';

import { collection, getDocs, query, doc, deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import { dbFirestore } from '../../api/firebase';

type Unburden = {
    id: string,
    date: Date,
    paragraph: string
}

export default function Home() {
    const [unburden, setUnburden] = useState<Unburden[]>([]);
    const [dateFilter, setDateFilter] = useState<{before: string, after: string}>({
        before: new Date(new Date().setDate(new Date().getDate() - 365)).toISOString().split("T")[0],
        after: new Date().toISOString().split("T")[0]
    })

    useEffect(() => {
        getUnburdens();
    }, []);

    async function getUnburdens() {
        let aux: Unburden[] = []
        const querySnapshot = await getDocs(query(collection(dbFirestore, 'unburdens')));
        querySnapshot.forEach((doc: any) => {
            aux.unshift({id: doc.id, date: doc.data().date, paragraph: doc.data().paragraph });
        });

        setUnburden(aux);
        setDateFilter({
            ...dateFilter,
            before: new Date(Number(aux[aux.length - 1].id)).toISOString().split("T")[0]
        })
    };

    async function addUnburden(text: string) {
        let idAux: string = new Date().valueOf().toString();
        await setDoc(doc(dbFirestore, 'unburdens', idAux), {
            date: new Date(),
            paragraph: text
        });

        setUnburden([
            {
                id: idAux,
                date: new Date(), 
                paragraph: text 
            },
            ...unburden
        ]);
    };

    async function deleteUnburden(id: string) {
        await deleteDoc(doc(dbFirestore, 'unburdens', id));
    }

    // async function updateUnburden(id: string, item: any) {
    //     await updateDoc(doc(dbFirestore, 'unburdens', id), item)
    // }

    return (
        <div className="App">
            <div className="App-header">
                <h2>Cantinho do Desabafo</h2>
                <UnburdenBotton unburden={(newUnburden) => {addUnburden(newUnburden);}}/>
            </div>
            <div className="App-body">
                <div className='date-filter'>
                    <strong>Período:</strong>
                    <input 
                        type='date' 
                        min={(unburden.length > 0 ? new Date(Number(unburden[unburden.length - 1].id)) : new Date()).toISOString().split("T")[0]}
                        max={(unburden.length > 0 ? new Date(Number(unburden[0].id)) : new Date()).toISOString().split("T")[0]}
                        defaultValue={dateFilter.before}
                        onChange={(e) => setDateFilter({ ...dateFilter, before: e.currentTarget.value })}
                    />
                    <FiCode className='icon' />
                    <input type='date'
                        min={(unburden.length > 0 ? new Date(Number(unburden[unburden.length - 1].id)) : new Date()).toISOString().split("T")[0]}
                        max={new Date().toISOString().split("T")[0]}
                        defaultValue={dateFilter.after}
                        onChange={(e) => setDateFilter({ ...dateFilter, after: e.currentTarget.value })}
                    />
                </div>
                {unburden.filter(({ id }) => { 
                    if(dateFilter) { return dateFilter?.before <= new Date(Number(id)).toISOString().split("T")[0] && 
                    dateFilter?.after >= new Date(Number(id)).toISOString().split("T")[0]} else {return 0}}).map((u, i) => { return (
                <UnburdenComponent 
                    key={u.id} 
                    index={i} 
                    item={u} 
                    editFunc={(item, index) => {
                        let auxArray = [...unburden];

                        auxArray.splice(index, 1, {...auxArray[index], date: new Date(), paragraph: 'Editado'});

                        setUnburden(auxArray);
                        // updateUnburden(u.id, auxArray);
                    }}
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