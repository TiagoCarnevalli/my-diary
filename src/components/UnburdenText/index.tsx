import React from 'react';
import './styles.scss';
import { FiTrash } from 'react-icons/fi';

interface Props {
    index: number;
    item: {
        date: string;
        paragraph: string;
    };
    deleteFunc: (index: number) => void;
}

export default function UnburdenComponent({index, item, deleteFunc}: Props) {
    return (
        <div key={index} className="Speach-component">
            <div className='SpeachHeader'>
                <strong className="Current-date">{item.date}</strong>
                <div className='DeleteButton'>
                    <FiTrash onClick={() => deleteFunc(index)} />
                </div>
            </div>
            <pre>{item.paragraph}</pre>
        </div>
    );
}