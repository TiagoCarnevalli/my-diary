import React from 'react';
import './styles.scss';
import { 
    FiTrash, 
    // FiEdit 
} from 'react-icons/fi';

interface Props {
    index: number;
    item: {
        date: string;
        paragraph: string;
    };
    editFunc: (index: number) => void;
    deleteFunc: (index: number) => void;
}

export default function UnburdenComponent({index, item, editFunc, deleteFunc}: Props) {
    return (
        <div key={index} className="Speach-component">
            <div className='SpeachHeader'>
                <strong className="Current-date">{item.date}</strong>
                <div className='Buttons'>
                    {/* <FiEdit onClick={() => editFunc(index)} /> */}
                    <FiTrash onClick={() => deleteFunc(index)} />
                </div>
            </div>
            <pre>{item.paragraph}</pre>
        </div>
    );
}