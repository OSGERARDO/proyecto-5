import React from 'react'

const Carrusel = () => {
    return (
        <>
            <div id="carouselExampleAutoplaying" className="carousel slide my-custom-carousel" data-bs-ride="carousel" style={{ minHeight: '300px', padding: '20px' }}>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/images/image1.jpg" className="d-block w-100 img-fluid" alt="uno" />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/dos.jpg" className="d-block w-100 img-fluid" alt="dos" />
                    </div>
                    <div className="carousel-item">
                        <img src="/images/tres.jpg" className="d-block w-100 img-fluid" alt="tres" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Carrusel