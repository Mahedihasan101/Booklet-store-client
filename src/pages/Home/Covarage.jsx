import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const Covarage = () => {
    const position = [23.6850, 90.3563]
    return (
        <div className='bg-white  h-[1000px] rounded-4xl'>
            <h1 className='font-extrabold text-[56px] text-secondary mt-10 pt-[100px] ml-[109px]'>We are available in 64 districts</h1>
            <div></div>
            <div className=' h-[426px] max-w-[1282px] mx-auto'>
                <h1 className='mt-[100px] font-extrabold text-3xl text-green-500 border-t-2 pt-10'>We deliver almost all over Bangladesh</h1>
                <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom={false}
                    className='h-[426px] max-w-[1282px] mx-auto mt-[100px]'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

        </div>
    );
};

export default Covarage;