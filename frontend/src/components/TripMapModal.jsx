import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const DESTINATION_COORDINATES = {
    'paris': [48.8566, 2.3522],
    'parís': [48.8566, 2.3522],
    'cusco': [-13.5319, -71.9675],
    'cuzco': [-13.5319, -71.9675],
    'tokyo': [35.6762, 139.6503],
    'tokio': [35.6762, 139.6503],
    'nueva york': [40.7128, -74.0060],
    'new york': [40.7128, -74.0060],
    'madrid': [40.4168, -3.7038],
    'barcelona': [41.3851, 2.1734],
    'londres': [51.5074, -0.1278],
    'london': [51.5074, -0.1278],
    'roma': [41.9028, 12.4964],
    'rome': [41.9028, 12.4964],
};

const TripMapModal = ({ isOpen, onClose, trips }) => {
    const { t } = useLanguage();
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [resolvedMarkers, setResolvedMarkers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Resolve coordinates for all destinations
    useEffect(() => {
        if (!isOpen) return;
        
        const resolveCoordinates = async () => {
            setIsLoading(true);
            const resolved = [];
            
            for (const trip of trips) {
                if (!trip.destino) continue;
                
                const parts = trip.destino.split(',');
                const ciudad = parts[0]?.trim();
                const pais = parts[1]?.trim() || '';
                if (!ciudad) continue;
                
                const query = ciudad.toLowerCase();
                let coords = DESTINATION_COORDINATES[query];
                
                if (!coords) {
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(ciudad + ', ' + pais)}&format=json&limit=1`,
                            { headers: { 'User-Agent': 'TripCollab-App' } }
                        );
                        const data = await response.json();
                        if (data && data.length > 0) {
                            coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                        }
                    } catch (e) {
                        console.error('Error geocoding destination:', ciudad, e);
                    }
                }
                
                if (coords) {
                    resolved.push({
                        id: trip.id,
                        coords,
                        titulo: trip.titulo,
                        destino: trip.destino,
                        precio: trip.precio
                    });
                }
            }
            
            setResolvedMarkers(resolved);
            setIsLoading(false);
        };
        
        resolveCoordinates();
    }, [isOpen, trips]);

    // 2. Initialize Leaflet Map
    useEffect(() => {
        if (!isOpen || isLoading || !mapContainerRef.current) return;

        // If map is already initialized, skip
        if (mapRef.current) return;

        // Initialize Leaflet Map
        const L = window.L;
        if (!L) {
            console.error('Leaflet is not loaded!');
            return;
        }

        const map = L.map(mapContainerRef.current, {
            center: [20, 0],
            zoom: 2,
            minZoom: 2,
            maxZoom: 18,
            zoomControl: false
        });

        // Add zoom control at bottom-right
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Add dark CartoDB tiles
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        mapRef.current = map;

        // Force a resize/render check in Leaflet after mount
        setTimeout(() => {
            map.invalidateSize();
        }, 150);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [isOpen, isLoading]);

    // 3. Render markers and marker clustering
    useEffect(() => {
        const map = mapRef.current;
        const L = window.L;
        if (!map || !L || resolvedMarkers.length === 0) return;

        // Create Marker Cluster Group
        const clusterGroup = L.markerClusterGroup({
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            maxClusterRadius: 40,
            iconCreateFunction: function (cluster) {
                const childCount = cluster.getChildCount();
                return new L.DivIcon({
                    html: `<div><span>${childCount}</span></div>`,
                    className: 'custom-cluster-icon',
                    iconSize: L.point(44, 44),
                    iconAnchor: L.point(22, 22)
                });
            }
        });

        // Add markers
        resolvedMarkers.forEach(marker => {
            // Custom pulsing DivIcon
            const pulsingIcon = new L.DivIcon({
                html: `
                    <div class="relative w-6 h-6 flex items-center justify-center animate-in zoom-in duration-300">
                        <div class="absolute w-5 h-5 bg-teal rounded-full opacity-60 pulsing-marker-ping"></div>
                        <div class="relative w-3.5 h-3.5 bg-teal border-2 border-white rounded-full shadow-lg"></div>
                    </div>
                `,
                className: 'custom-pulsing-marker-wrapper',
                iconSize: L.point(24, 24),
                iconAnchor: L.point(12, 12)
            });

            const leafletMarker = L.marker(marker.coords, { icon: pulsingIcon });
            
            // Modern glassmorphism popup
            leafletMarker.bindPopup(`
                <div class="p-4 text-text-primary">
                    <h4 class="font-extrabold text-sm text-teal-glow uppercase tracking-tight mb-1">${marker.titulo}</h4>
                    <p class="text-xs text-text-muted mb-3 flex items-center gap-1">📍 ${marker.destino}</p>
                    <div class="flex justify-between items-center pt-2.5 border-t border-white/10">
                        <span class="text-[9px] uppercase font-black text-text-muted tracking-wider">Precio</span>
                        <span class="text-xs font-black text-primary-glow">${marker.precio}€</span>
                    </div>
                </div>
            `, {
                className: 'custom-map-popup',
                closeButton: false,
                offset: L.point(0, -6)
            });

            clusterGroup.addLayer(leafletMarker);
        });

        map.addLayer(clusterGroup);

        // Fit map view bounds
        if (resolvedMarkers.length > 0) {
            const bounds = L.latLngBounds(resolvedMarkers.map(m => m.coords));
            map.fitBounds(bounds, { padding: [50, 50] });
        }

        return () => {
            if (map) {
                map.removeLayer(clusterGroup);
            }
        };
    }, [resolvedMarkers]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="glass w-full max-w-5xl h-[80vh] flex flex-col rounded-[32px] overflow-hidden shadow-3xl border border-white/10 animate-in slide-in-from-bottom-8 duration-500">
                <header className="px-8 py-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/[0.01]">
                    <div>
                        <h2 className="text-2xl font-black bg-linear-to-r from-teal to-primary bg-clip-text text-transparent uppercase tracking-tight">
                            Mapa de Viajes
                        </h2>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mt-0.5">
                            Visualiza y explora la distribución de tus planes de viaje
                        </p>
                    </div>
                    <button 
                        type="button" 
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all font-black text-text-primary hover:scale-105 active:scale-95"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </header>

                <div className="flex-1 relative bg-bg-deep">
                    {isLoading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-bg-deep/85">
                            <span className="text-4xl animate-bounce">🌍</span>
                            <span className="text-xs uppercase font-bold text-text-muted tracking-widest animate-pulse">Cargando destinos...</span>
                        </div>
                    ) : resolvedMarkers.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 text-center px-6">
                            <span className="text-5xl mb-2">🗺️</span>
                            <h3 className="text-lg font-bold uppercase">Sin destinos en el mapa</h3>
                            <p className="text-xs text-text-muted max-w-sm">No hemos podido geolocalizar ningún destino de tus planes actuales.</p>
                        </div>
                    ) : null}

                    {/* Leaflet container */}
                    <div 
                        ref={mapContainerRef} 
                        className="w-full h-full z-0" 
                        style={{ outline: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TripMapModal;
