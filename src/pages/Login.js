import React from 'react';
import Autentica from './../components/autentica/auth';
import Title from './../components/Title/index';

export default function Login() {
    return (
        <div>
            <Title
                title={"Login"}
                texto={"Faça seu login para concluir a compra"} />
            <Autentica />
        </div>
    )
}