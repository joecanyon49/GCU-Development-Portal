'use client';

import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, useMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Layers, Map as MapIcon, Hammer, Clock, GraduationCap, X } from 'lucide-react';
import clsx from 'clsx';

// Constants
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const GCU_CENTER = { lat: 33.5126, lng: -112.1260 };
const PHOENIX_CENTER = { lat: 33.4484, lng: -112.0740 }; // Approximated for "City Serve" context

// Map Styles (Dark / Stark Theme)
// Map Styles
const MAP_ID = 'gcu-satellite-map'; // Using a descriptive ID, though style effect depends on console config
// We are removing the explicit DARK_MAP_STYLE array to let Satellite imagery shine.


// Views Configuration
const VIEWS = {
    intro: {
        center: GCU_CENTER, // Start centered but high up
        zoom: 12,
        tilt: 0,
        heading: 0,
        label: "Intro"
    },
    campus: {
        center: GCU_CENTER,
        zoom: 18, // Slightly closer for 3D effect
        tilt: 45,
        heading: 0,
        label: "Campus Overview"
    },
    cityServe: {
        center: PHOENIX_CENTER,
        zoom: 11,
        tilt: 0,
        heading: 0,
        label: "City Serve"
    },
    trades: {
        center: GCU_CENTER,
        zoom: 16,
        tilt: 45,
        heading: 45,
        label: "Trades Network"
    },
    future: {
        center: GCU_CENTER,
        zoom: 17,
        tilt: 60,
        heading: -45,
        label: "Future Projects"
    }
};

type ViewMode = keyof typeof VIEWS;

function MapController({ activeView }: { activeView: ViewMode }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const target = VIEWS[activeView];

        // Smoothly animate to the new view
        // Google Maps 'moveCamera' is instant, 'panTo' is smooth.
        // For a cinematic "fly-in" feel, we can try to animate multiple properties.

        // If we are strictly just moving the camera:
        // map.moveCamera({
        //     center: target.center,
        //     zoom: target.zoom,
        //     tilt: target.tilt,
        //     heading: target.heading
        // });

        // Custom animation approach for smoother transitions
        const startZoom = map.getZoom() || 12;
        const endZoom = target.zoom;
        const isZoomingIn = endZoom > startZoom;

        map.panTo(target.center);

        // Simple interval for smooth zoom if the change is significant (like intro -> campus)
        // This is a basic implementation. Ideally, one would use requestAnimationFrame and easing.
        const zoomDiff = Math.abs(endZoom - startZoom);

        if (zoomDiff > 1) {
            let currentZoom = startZoom;
            const steps = 60; // 60 frames approx 1-2 seconds
            const stepSize = (endZoom - startZoom) / steps;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                currentZoom += stepSize;
                map.setZoom(currentZoom);
                map.setTilt(target.tilt * (step / steps)); // Interpolate tilt too
                map.setHeading(target.heading * (step / steps));

                if (step >= steps) {
                    clearInterval(timer);
                    // Ensure final state matches exactly
                    map.moveCamera({
                        center: target.center,
                        zoom: target.zoom,
                        tilt: target.tilt,
                        heading: target.heading
                    });
                }
            }, 16); // ~60fps
        } else {
            map.moveCamera({
                center: target.center,
                zoom: target.zoom,
                tilt: target.tilt,
                heading: target.heading
            });
        }

    }, [map, activeView]);

    return null;
}

export default function CampusMap() {
    const [activeView, setActiveView] = useState<ViewMode>('intro');
    const [showBuildingCard, setShowBuildingCard] = useState(false);

    // Auto-advance from Intro to Campus
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (activeView === 'intro') {
            timeout = setTimeout(() => {
                setActiveView('campus');
            }, 1500); // Wait 1.5s before flying in
        }
        return () => clearTimeout(timeout);
    }, [activeView]);

    const [year, setYear] = useState(2025);

    // Placeholder for when no API key is present
    if (!GOOGLE_MAPS_API_KEY) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-950 text-white">
                <div className="text-center p-8 max-w-md">
                    <MapIcon size={48} className="mx-auto mb-4 text-purple-500 opacity-50" />
                    <h2 className="text-2xl font-bold mb-2">Maps API Key Required</h2>
                    <p className="text-gray-400">Please add <code className="bg-gray-800 px-1 py-0.5 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your environment variables to enable the Stark Map.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-black relative overflow-hidden font-sans text-white">

            {/* Map Layer */}
            <div className="absolute inset-0 z-0">
                <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                    <Map
                        defaultCenter={GCU_CENTER}
                        defaultZoom={17}
                        maxZoom={20}
                        minZoom={3}
                        disableDefaultUI={true}
                        mapId={MAP_ID}
                        mapTypeId={'satellite'}
                        gestureHandling={'greedy'}
                        // styles={DARK_MAP_STYLE} // Removed for satellite view

                        className="w-full h-full"
                    >
                        <MapController activeView={activeView} />
                    </Map>
                </APIProvider>
            </div>

            {/* "Whited Out" / Vignette Overlay (Focus effect) - REMOVED per user request */}
            {/* <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.8)_60%,#ffffff_100%)] z-10 backdrop-blur-[2px]" /> */}


            {/* UI Layer */}
            <div className="absolute inset-0 z-20 pointer-events-none p-8 flex flex-col justify-between">

                {/* Header */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl animate-in slide-in-from-top-4 duration-500">
                        <h1 className="text-2xl font-bold tracking-tight text-white mb-1 uppercase font-mono">GCU <span className="text-purple-500">Masterplan</span></h1>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            LIVE FEED // PHOENIX, AZ
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {/* Optional top-right controls */}
                    </div>
                </div>

                {/* Building Card (Pop-up) */}
                {showBuildingCard && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto w-96">
                        <div className="bg-gray-900/90 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white">GCU Arena</h2>
                                    <p className="text-purple-400 text-xs font-mono">SECTOR 7 // ATHLETICS</p>
                                </div>
                                <button onClick={() => setShowBuildingCard(false)} className="text-gray-400 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm py-2 border-b border-white/10">
                                    <span className="text-gray-400">Capacity</span>
                                    <span className="font-mono">7,000</span>
                                </div>
                                <div className="flex justify-between text-sm py-2 border-b border-white/10">
                                    <span className="text-gray-400">Tenants</span>
                                    <span className="text-right">Men's Basketball<br />Women's Basketball</span>
                                </div>
                                <div className="flex justify-between text-sm py-2">
                                    <span className="text-gray-400">Status</span>
                                    <span className="text-green-400 font-bold text-xs uppercase bg-green-900/30 px-2 py-0.5 rounded">Operational</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* Bottom Controls */}
                <div className="pointer-events-auto w-full max-w-4xl mx-auto space-y-4">

                    {/* Timeline Slider (Always visible) */}
                    <div className="bg-black/60 backdrop-blur-md rounded-full px-6 py-3 border border-white/10 flex items-center gap-4 animate-in slide-in-from-bottom-2">
                        <Clock size={16} className="text-purple-400" />
                        <span className="font-mono text-sm text-purple-400 font-bold">{year}</span>
                        <input
                            type="range"
                            min="2010"
                            max="2030"
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                    </div>

                    {/* Navigation Dock */}
                    <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex justify-center gap-2 shadow-2xl">
                        <NavButton
                            active={activeView === 'campus'}
                            onClick={() => setActiveView('campus')}
                            icon={<MapIcon size={20} />}
                            label="Overview"
                        />
                        <NavButton
                            active={activeView === 'cityServe'}
                            onClick={() => setActiveView('cityServe')}
                            icon={<Layers size={20} />}
                            label="City Serve"
                        />
                        <NavButton
                            active={activeView === 'trades'}
                            onClick={() => setActiveView('trades')}
                            icon={<Hammer size={20} />}
                            label="Trades"
                        />
                        <NavButton
                            active={activeView === 'future'}
                            onClick={() => setActiveView('future')}
                            icon={<GraduationCap size={20} />}
                            label="Future Projects"
                        />
                    </div>
                </div>
            </div>

            {/* Corner Decorative Elements for "Stark" feel */}
            <div className="absolute top-8 right-8 w-64 h-32 border-r-2 border-t-2 border-purple-500/20 rounded-tr-3xl pointer-events-none" />
            <div className="absolute bottom-8 left-8 w-64 h-32 border-l-2 border-b-2 border-purple-500/20 rounded-bl-3xl pointer-events-none" />

        </div>
    );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-sm border",
                active
                    ? "bg-purple-600/90 border-purple-500/50 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] transform scale-105"
                    : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5 active:scale-95"
            )}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}
