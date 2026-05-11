import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../services/api';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
    const [availableTrips, setAvailableTrips] = useState([
        { id: 1, titulo: 'EuroTrip 2026', destino: 'París, Francia', fechaInicio: '2026-06-10', fechaFin: '2026-06-25', rol: 'admin', precio: 500 },
        { id: 2, titulo: 'Aventura en los Andes', destino: 'Cusco, Perú', fechaInicio: '2026-08-05', fechaFin: '2026-08-20', rol: 'colaborador', precio: 800 },
        { id: 3, titulo: 'Tokyo Neon Nights', destino: 'Tokyo, Japón', fechaInicio: '2026-10-15', fechaFin: '2026-11-01', rol: 'creador', precio: 1200 }
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
                    rol: 'colaborador' // Valor por defecto si no viene del backend
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

    return (
        <TripContext.Provider value={{ availableTrips, reservations, bookedTrips, allDestinations, addReservation, confirmBooking, setAvailableTrips }}>
            {children}
        </TripContext.Provider>
    );
};

export const useTrips = () => useContext(TripContext);
