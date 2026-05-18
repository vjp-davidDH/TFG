import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/api';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const roles = ['creador', 'admin', 'colaborador'];

    const [availableTrips, setAvailableTrips] = useState([
        { id: 1, titulo: 'EuroTrip 2026', destino: 'París, Francia', fechaInicio: '2026-06-10', fechaFin: '2026-06-25', rol: 'admin', precio: 500 },
        { id: 2, titulo: 'Aventura en los Andes', destino: 'Cusco, Perú', fechaInicio: '2026-08-05', fechaFin: '2026-08-20', rol: 'colaborador', precio: 800 },
        { id: 3, titulo: 'Tokyo Neon Nights', destino: 'Tokyo, Japón', fechaInicio: '2026-10-15', fechaFin: '2026-11-01', rol: 'creador', precio: 1200 },
        { id: 4, titulo: 'Safari en Kenya', destino: 'Nairobi, Kenya', fechaInicio: '2026-09-01', fechaFin: '2026-09-15', rol: 'admin', precio: 1500 },
        { id: 5, titulo: 'Auroras Boreales', destino: 'Reykjavik, Islandia', fechaInicio: '2026-12-10', fechaFin: '2026-12-20', rol: 'colaborador', precio: 2000 },
        { id: 6, titulo: 'Crucero por el Caribe', destino: 'Miami, USA', fechaInicio: '2026-01-15', fechaFin: '2026-01-30', rol: 'creador', precio: 1800 },
        { id: 7, titulo: 'Ruta de la Seda', destino: 'Samarcanda, Uzbekistán', fechaInicio: '2026-05-05', fechaFin: '2026-05-20', rol: 'admin', precio: 950 },
        { id: 8, titulo: 'Patagonia Salvaje', destino: 'Torres del Paine, Chile', fechaInicio: '2026-11-10', fechaFin: '2026-11-25', rol: 'colaborador', precio: 1100 },
        { id: 9, titulo: 'Luces de Broadway', destino: 'New York, USA', fechaInicio: '2026-03-20', fechaFin: '2026-03-27', rol: 'creador', precio: 1400 },
        { id: 10, titulo: 'Gran Muralla', destino: 'Beijing, China', fechaInicio: '2026-04-12', fechaFin: '2026-04-25', rol: 'admin', precio: 850 },
        { id: 11, titulo: 'Fiordos Noruegos', destino: 'Oslo, Noruega', fechaInicio: '2026-06-15', fechaFin: '2026-06-25', rol: 'colaborador', precio: 1300 },
        { id: 12, titulo: 'Pirámides de Giza', destino: 'El Cairo, Egipto', fechaInicio: '2026-09-20', fechaFin: '2026-10-05', rol: 'creador', precio: 700 }
    ]);

    const [reservations, setReservations] = useState(() => {
        const saved = localStorage.getItem('user_reservations');
        return saved ? JSON.parse(saved) : [];
    });

    const [bookedTrips, setBookedTrips] = useState(() => {
        const saved = localStorage.getItem('user_booked');
        return saved ? JSON.parse(saved) : [];
    });

    const [allDestinations, setAllDestinations] = useState([]);

    useEffect(() => {
        localStorage.setItem('user_reservations', JSON.stringify(reservations));
    }, [reservations]);

    useEffect(() => {
        localStorage.setItem('user_booked', JSON.stringify(bookedTrips));
    }, [bookedTrips]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const trips = await apiClient.trips.getAll();
                console.log('Trips from API:', trips);
                const mappedTrips = trips.map(t => ({
                    id: t.id_plan,
                    titulo: t.nombre,
                    destino: t.destino ? `${t.destino.ciudad}, ${t.destino.pais}` : 'Destino desconocido',
                    precio: t.precio_total,
                    descripcion: t.descripcion,
                    rol: roles[Math.floor(Math.random() * roles.length)]
                }));
                setAvailableTrips(mappedTrips);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        const fetchDestinations = async () => {
            try {
                const destinations = await apiClient.destinations.getAll();
                setAllDestinations(destinations);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchTrips();
        fetchDestinations();
    }, []);

    const addReservation = (trip) => {
        if (!reservations.find(r => r.id === trip.id)) {
            setReservations([...reservations, trip]);
            return true;
        }
        return false;
    };

    const confirmBooking = (tripId) => {
        const trip = reservations.find(r => r.id === tripId);
        if (trip) {
            setBookedTrips([...bookedTrips, { ...trip, status: 'paid' }]);
            setReservations(reservations.filter(r => r.id !== tripId));
            return true;
        }
        return false;
    };

    const removeReservation = (tripId) => {
        setReservations(reservations.filter(r => r.id !== tripId));
    };

    return (
        <TripContext.Provider value={{
            availableTrips, reservations, bookedTrips, allDestinations,
            addReservation, confirmBooking, removeReservation, setAvailableTrips
        }}>
            {children}
        </TripContext.Provider>
    );
};

export const useTrips = () => useContext(TripContext);
