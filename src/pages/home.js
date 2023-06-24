import React from 'react';
import Title from './../components/Title/index';
import Card from './../components/Card/index';

function Home() {
    return (
        <div>
            <Title
                title={"Ecommerce Pet Shop"}
                text={"Catalogo De Produtos"} />
            {/* <Title title=""/> */}
            <Card />
        </div>
    )
}
export default Home;