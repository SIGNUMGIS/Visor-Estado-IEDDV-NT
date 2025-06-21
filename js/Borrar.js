// Initialize the map centered on Colombia
const map = L.map('map').setView([7.0456, -74.2973], 7);

// Create panes for z-index control
map.createPane('polygons');
map.createPane('polylines');
map.createPane('points');
map.createPane('labels');

// Set z-index values
map.getPane('polygons').style.zIndex = 200;
map.getPane('polylines').style.zIndex = 400;
map.getPane('points').style.zIndex = 600;
map.getPane('labels').style.zIndex = 800;

// Base maps
const baseMaps = {
    "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        pane: 'tilePane'
    }),
    "ESRI Satellite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        pane: 'tilePane'
    })
};

// Add default base map
baseMaps["OpenStreetMap"].addTo(map);

// Layer styles
const styles = {
    point: {
        icon: function(zoomLevel) {
            const size = Math.max(8, 14 - (15 - zoomLevel));
            return L.divIcon({
                className: 'custom-fa-marker',
                html: `<i class="fa-regular fa-plus" style="font-size: ${size}px;"></i>`,
                iconSize: [size, size],
                iconAnchor: [size/2, size/2],
                pane: 'points'
            });
        }
    },
    polyline1: { color: '#1df00a', weight: 4, opacity: 0.8, pane: 'polylines' },
    polyline2: { color: '#fac107', weight: 4, opacity: 0.8, pane: 'polylines' },
    polyline3: { color: '#9c0eee', weight: 4, opacity: 0.8, pane: 'polylines' },
    polyline4: { color: '#0E30EE', weight: 4, opacity: 0.8, pane: 'polylines' },

    polygon: { 
        fillColor: '#EDED0E', 
        weight: 1, 
        color: '#EDBD0E',
        fillOpacity: 0.3,
        pane: 'polygons'
    }
};

// Create layer groups
const layers = {
    point: L.layerGroup().addTo(map),
    polyline1: L.layerGroup().addTo(map),
    polyline2: L.layerGroup().addTo(map),
    polyline3: L.layerGroup().addTo(map),
    polyline4: L.layerGroup().addTo(map),
    polygon: L.layerGroup().addTo(map),
    pointLabels: L.layerGroup(),
    polylineLabels: L.layerGroup(),
    polygonLabels: L.layerGroup()
};

// Store point layers for zoom updates
const pointLayers = [];

// Base map toggles
document.getElementById('base-street')?.addEventListener('change', function() {
    if (this.checked) {
        map.removeLayer(baseMaps["ESRI Satellite"]);
        map.addLayer(baseMaps["OpenStreetMap"]);
    }
});

document.getElementById('base-satellite')?.addEventListener('change', function() {
    if (this.checked) {
        map.removeLayer(baseMaps["OpenStreetMap"]);
        map.addLayer(baseMaps["ESRI Satellite"]);
    }
});

// GeoJSON loader
function loadGeoJSON(url, layer, style, labelField, layerType = 'polygon') {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            layer.clearLayers();
            
            L.geoJSON(data, {
                pointToLayer: (feature, latlng) => {
                    if (layerType === 'point') {
                        const marker = L.marker(latlng, { 
                            icon: styles.point.icon(map.getZoom()),
                            pane: 'points'
                        });
                        pointLayers.push(marker);
                        return marker;
                    }
                    return L.circleMarker(latlng, style);
                },
                style: style,
                onEachFeature: (feature, layer) => {
                    if (feature.properties) {
                        let popupContent = '<div class="info"><h4>Información</h4>';
                        for (const prop in feature.properties) {
                            popupContent += `<b>${prop}:</b> ${feature.properties[prop]}<br>`;
                        }
                        popupContent += '</div>';
                        layer.bindPopup(popupContent);
                    }
                    
                    if (labelField && feature.properties?.[labelField]) {
                        const position = layer.getBounds?.().getCenter() || layer.getLatLng();
                        const labelColor = layerType === 'polygon' ? '#000307' : 
                                         layerType === 'polyline' ? style.color : '#ff0000';
                        
                        const label = L.marker(position, {
                            icon: L.divIcon({
                                className: 'map-label',
                                html: `<div style="font-size:12px;font-weight:bold;color:${labelColor};
                                      text-shadow:-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff;">
                                      ${feature.properties[labelField]}</div>`,
                                iconSize: [100, 20],
                                pane: 'labels'
                            }),
                            interactive: false
                        });
                        
                        const labelLayer = layerType === 'polygon' ? layers.polygonLabels :
                                        layerType === 'polyline' ? layers.polylineLabels :
                                        layers.pointLabels;
                        
                        labelLayer.addLayer(label);
                    }
                }
            }).addTo(layer);
        })
        .catch(console.error);
}

// Load GeoJSON data
loadGeoJSON('geojs/C1.geojson', layers.polyline1, styles.polyline1, 'RML', 'polyline');
loadGeoJSON('geojs/C2.geojson', layers.polyline2, styles.polyline2, 'RML', 'polyline');
loadGeoJSON('geojs/C3.geojson', layers.polyline3, styles.polyline3, 'RML', 'polyline');
loadGeoJSON('geojs/C4.geojson', layers.polyline4, styles.polyline4, 'RML', 'polyline');

// Update point icons on zoom
map.on('zoomend', function() {
    const zoom = map.getZoom();
    pointLayers.forEach(marker => {
        marker.setIcon(styles.point.icon(zoom));
    });
});

// ==============================================
// PANEL CONTROL FUNCTIONS
// ==============================================

const panel = document.getElementById('control-panel');
const closeBtn = document.getElementById('close-panel-btn');
const menuBtn = document.getElementById('mobile-menu-btn');

// Function to toggle panel visibility with animation
function togglePanel(show) {
    if (show) {
        // Show panel - slide in from left
        panel.style.transform = 'translateX(0)';
        panel.style.display = 'block';
        panel.classList.add('active');
    } else {
        // Hide panel - slide out to left
        panel.style.transform = 'translateX(-100%)';
        
        // After animation completes, hide completely
        setTimeout(() => {
            panel.style.display = 'none';
        }, 300); // Match this with your CSS transition duration
        
        panel.classList.remove('active');
    }
}

// Initialize panel state
togglePanel(false); // Start with panel hidden

// Close button click handler
closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    togglePanel(false); // Hide panel
});

// Menu button click handler
menuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    togglePanel(true); // Show panel
});

// Close when clicking outside panel
document.addEventListener('click', function(e) {
    if (panel.classList.contains('active') && 
        !panel.contains(e.target) && 
        e.target !== menuBtn && 
        !menuBtn.contains(e.target)) {
        togglePanel(false);
    }
});

// Close with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && panel.classList.contains('active')) {
        togglePanel(false);
    }
});

// ==============================================
// LAYER TOGGLES
// ==============================================

function setupToggle(id, layer) {
    document.getElementById(id)?.addEventListener('change', (e) => {
        e.target.checked ? map.addLayer(layer) : map.removeLayer(layer);
    });
}

setupToggle('polyline1-layer-toggle', layers.polyline1);
setupToggle('polyline2-layer-toggle', layers.polyline2);
setupToggle('polyline3-layer-toggle', layers.polyline3);
setupToggle('polyline4-layer-toggle', layers.polyline4);
setupToggle('polyline-labels-toggle', layers.polylineLabels);
// setupToggle('polygon-labels-toggle', layers.polygonLabels);

