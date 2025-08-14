import { useEffect, useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import "./App.css";
import type { Marker } from "@react-jvectormap/core/dist/types";
import CloseIcon from "./assets/close.svg";

interface PhotoPin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  coordinates: [number, number];
  date: string;
}

const photoPins: PhotoPin[] = [
  {
    coordinates: [-23.53, -46.62],
    title: 'São Paulo',
    description:
      "A vibrant city with a rich cultural scene. This photo captures the skyline at dusk.",
    imageUrl:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&h=300&fit=crop",
    id: "0",
    date: "2023-12-01",
  },
  {
    id: "1",
    title: "Sunset at Golden Gate Bridge",
    description:
      "Beautiful sunset view from Crissy Field in San Francisco. The bridge looks magical during golden hour.",
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop",
    coordinates: [37.7749, -122.4194], // San Francisco
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Times Square Night",
    description:
      "The bustling energy of Times Square at night. So many lights and people!",
    imageUrl:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=300&fit=crop",
    coordinates: [40.7589, -73.9857],
    date: "2024-02-20",
  },
  {
    id: "3",
    title: "Eiffel Tower View",
    description:
      "Classic view of the Eiffel Tower from Trocadéro. Paris never disappoints!",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    coordinates: [48.8584, 2.2945],
    date: "2024-03-10",
  },
  {
    id: "4",
    title: "Cherry Blossoms in Tokyo",
    description:
      "Beautiful sakura season in Shinjuku Gyoen. The perfect spring moment.",
    imageUrl:
      "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=500&h=300&fit=crop",
    coordinates: [35.6895, 139.6917],
    date: "2024-04-05",
  },
  {
    id: "5",
    title: "Sydney Opera House",
    description:
      "Iconic architecture by the harbor. The Sydney Opera House is truly spectacular.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    coordinates: [-33.8568, 151.2093],
    date: "2024-05-18",
  },
];

function App() {
  const [selectedPin, setSelectedPin] = useState<PhotoPin | null>(null);
  const [markers, setMarkers] = useState<Marker[]>(photoPins.map((pin) => ({
      latLng: [pin.coordinates[0], pin.coordinates[1]],
      name: pin.title,
      id: pin.id,
    })));

  useEffect(() => {
    const markerData: Marker[] = photoPins.map((pin) => ({
      latLng: [pin.coordinates[0], pin.coordinates[1]],
      name: pin.title,
      id: pin.id,
    }));
    setMarkers(markerData);
  }, []);

  const handleMarkerClick = (_event: any, code: string) => {
    console.log("Marker clicked:", code);
    const pin = photoPins.find((p) => p.id === code);
    console.log(pin)
    if (pin) {
      setSelectedPin(pin);
    }
  };

  const closeModal = () => {
    setSelectedPin(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>My Travel Photo Map</h1>
        <p>Explore my adventures around the world!</p>
      </header>

      <div className="map-container">
        <VectorMap
          map={worldMill}
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0,
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "default",
            },
          }}
          markerStyle={{
            initial: {
              r: 8,
              fill: "#ff6b6b",
              stroke: "#fff",
              "stroke-width": 3,
              "fill-opacity": 0.9,
            },
            hover: {
              r: 12,
              fill: "#ff5252",
              cursor: "pointer",
            },
          }}
          markers={markers}
          onMarkerClick={handleMarkerClick}
          onMarkerTipShow={(_event: any, tip: any, code: string) => {
            const pin = photoPins.find((p) => p.id === code);
            console.log({ pin });
            if (pin) {
              tip.html(
                `<div style="padding: 5px;"><strong>${pin.title}</strong><br/>${pin.date}</div>`
              );
            }
          }}
          style={{ width: "100%", height: "600px" }}
        />
      </div>

      {selectedPin && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <img src={CloseIcon} width="20" height="20" alt="Close" />
            </button>
            <div className="modal-header">
              <h2>{selectedPin.title}</h2>
              <span className="modal-date">{selectedPin.date}</span>
            </div>
            <div className="modal-body">
              <img
                src={selectedPin.imageUrl}
                alt={selectedPin.title}
                className="modal-image"
              />
              <p className="modal-description">{selectedPin.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="pin-legend">
        <h3>Photo Locations ({photoPins.length})</h3>
        <div className="pin-list">
          {photoPins.map((pin) => (
            <div
              key={pin.id}
              className="pin-item"
              onClick={() => setSelectedPin(pin)}
            >
              <div className="pin-marker"></div>
              <div className="pin-info">
                <span className="pin-title">{pin.title}</span>
                <span className="pin-date">{pin.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
