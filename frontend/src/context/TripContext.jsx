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
    const [favorites, setFavorites] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        localStorage.setItem('user_reservations', JSON.stringify(reservations));
    }, [reservations]);

    useEffect(() => {
        localStorage.setItem('user_booked', JSON.stringify(bookedTrips));
    }, [bookedTrips]);

    useEffect(() => {
        const handleStorageChange = () => setToken(localStorage.getItem('token'));
        window.addEventListener('storage', handleStorageChange);
        const interval = setInterval(handleStorageChange, 1000);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (!token) {
            setFavorites([]);
            return;
        }

        const fetchTrips = async () => {
            try {
                const trips = await apiClient.trips.getAll();
                console.log('Trips from API:', trips);
                const mappedTrips = trips.map(t => {
                    let fechaInicio = '';
                    let fechaFin = '';
                    if (t.transportes && t.transportes.length > 0) {
                        const salidas = t.transportes.map(tr => tr.fecha_salida).filter(Boolean).sort();
                        const llegadas = t.transportes.map(tr => tr.fecha_llegada).filter(Boolean).sort();
                        fechaInicio = salidas[0] ? salidas[0].split('T')[0] : '';
                        fechaFin = llegadas[llegadas.length - 1] ? llegadas[llegadas.length - 1].split('T')[0] : '';
                    }
                    return {
                        id: t.id_plan,
                        titulo: t.nombre,
                        destino: t.destino ? `${t.destino.ciudad}, ${t.destino.pais}` : 'Destino desconocido',
                        destino_descripcion: t.destino ? t.destino.descripcion : null,
                        precio: t.precio_total,
                        descripcion: t.descripcion,
                        fechaInicio,
                        fechaFin,
                        alojamientos: t.alojamientos || [],
                        transportes: t.transportes || [],
                        rol: roles[Math.floor(Math.random() * roles.length)]
                    };
                });
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

        const fetchFavorites = async () => {
            try {
                const favs = await apiClient.favorites.getAll();
                setFavorites(favs.map(f => f.id_plan));
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchTrips();
        fetchDestinations();
        fetchFavorites();
    }, [token]);

    const addReservation = (trip) => {
        if (!reservations.find(r => r.id === trip.id)) {
            setReservations([...reservations, trip]);
            return true;
        }
        return false;
    };

    const confirmBooking = async (trip, method = 'tarjeta') => {
        try {
            let id_reserva = null;
            if (trip && typeof trip === 'object') {
                if (typeof trip.id_reserva === 'string' && trip.id_reserva.startsWith('local-')) {
                    const newRes = await apiClient.reservations.create({ id_plan: trip.id, estado: 'confirmada' });
                    id_reserva = newRes.id_reserva;
                    setReservations(prev => prev.filter(r => r.id !== trip.id));
                } else if (trip.id_reserva) {
                    await apiClient.reservations.updateEstado(trip.id_reserva, 'confirmada');
                    id_reserva = trip.id_reserva;
                } else {
                    const newRes = await apiClient.reservations.create({ id_plan: trip.id, estado: 'confirmada' });
                    id_reserva = newRes.id_reserva;
                    setReservations(prev => prev.filter(r => r.id !== trip.id));
                }
            } else {
                const tripId = trip;
                const newRes = await apiClient.reservations.create({ id_plan: tripId, estado: 'confirmada' });
                id_reserva = newRes.id_reserva;
                setReservations(prev => prev.filter(r => r.id !== tripId));
            }

            if (id_reserva) {
                const amount = trip && typeof trip === 'object' ? (trip.precio || trip.precio_total || 0) : 0;
                await apiClient.payments.create({
                    id_reserva,
                    monto: amount,
                    metodo_pago: method,
                    estado: 'pagado'
                });
            }
            return true;
        } catch (error) {
            console.error('Error confirming booking:', error);
            return false;
        }
    };

    const removeReservation = (tripId) => {
        setReservations(reservations.filter(r => r.id !== tripId));
    };

    const addFavorite = async (id_plan) => {
        try {
            await apiClient.favorites.add(id_plan);
            setFavorites(prev => [...prev, id_plan]);
            return true;
        } catch (error) {
            console.error('Error adding favorite:', error);
            return false;
        }
    };

    const removeFavorite = async (id_plan) => {
        try {
            await apiClient.favorites.delete(id_plan);
            setFavorites(prev => prev.filter(id => id !== id_plan));
            return true;
        } catch (error) {
            console.error('Error removing favorite:', error);
            return false;
        }
    };

    return (
        <TripContext.Provider value={{
            availableTrips, reservations, bookedTrips, allDestinations, favorites,
            addReservation, confirmBooking, removeReservation, setAvailableTrips,
            addFavorite, removeFavorite
        }}>
            {children}
        </TripContext.Provider>
    );
};

export const useTrips = () => useContext(TripContext);
