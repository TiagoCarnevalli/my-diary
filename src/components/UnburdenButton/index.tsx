import React, { useState } from 'react';
import './styles.scss';

interface Props {
    unburden: (newUnburden: string) => void;
}

export default function UnburdenBotton(props: Props) {
    const [opened, setOpened] = useState(false);
    const [text, setText] = useState("");

    const addNew = (text: string) => {
        props.unburden(text);
        setText("");
        setOpened(false);
    }

    return (
        <>
            <button className='Ubutton' onClick={() => {setOpened(true)}}>Desabafar</button>
            <div className='PopUp' hidden={!opened}>
                <div className='UnburdenBox'>
                    <textarea
                        placeholder='Desabafe...'
                        style={{ 
                            resize: 'none',
                            height: '10rem',
                            padding: '0.6rem 1rem',
                            borderRadius: '0.4rem'
                        }}
                        value={text}
                        onChange={({ target }) => {setText(target.value)}}
                    />
                    <div className='UBFooter'>
                        <button style={{ background: '#f33' }} onClick={() => {setOpened(false)}}>Cancelar</button>
                        <button style={{ background: '#3c3' }} hidden={text === ""} onClick={() => {text !== "" && addNew(text)}}>Salvar</button>
                    </div>
                </div>
            </div>
        </>
    )
}