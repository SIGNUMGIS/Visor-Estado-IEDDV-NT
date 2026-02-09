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
            const base = Math.max(8, 14 - (15 - zoomLevel));
            const size = base * 2; // tamaño 2 veces más grande
            return L.divIcon({
                className: 'custom-fa-marker',
                html: `<i class="fa-regular fa-plus" style="font-size: ${size}px;"></i>`,
                iconSize: [size, size],
                iconAnchor: [size / 2, size / 2],
                pane: 'points'
            });
        }
    },

    evento: {
        icon: function(zoomLevel) {
            const base = Math.max(8, 14 - (15 - zoomLevel));
            const size = base * 2; // double the original size
            return L.divIcon({
                className: 'custom-fa-marker',
                html: `<i class="fa-solid fa-thumbtack" style="font-size: ${size}px; color: #f70808ff;"></i>`,
                iconSize: [size, size],
                iconAnchor: [size / 1, size / 1],
                pane: 'points'
            });
        }
    },

    procesomenor: {
        icon: function(zoomLevel) {
            const base = Math.max(8, 14 - (15 - zoomLevel));
            const size = base * 2; // double the original size
            return L.divIcon({
                className: 'custom-fa-marker',
                html: `<i class="fa-solid fa-thumbtack" style="font-size: ${size}px; color: #f50ef5ff;"></i>`,
                iconSize: [size, size],
                iconAnchor: [size / 1, size / 1],
                pane: 'points'
            });
        }
    },
    
    edificacion: {
        icon: function(zoomLevel) {
            const base = Math.max(8, 14 - (15 - zoomLevel));
            const size = base * 2; // double the original size
            return L.divIcon({
            className: 'custom-fa-marker',
            html: `<i class="fa-solid fa-house" style="font-size: ${size}px;"></i>`,
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
            pane: 'points'
            });
        }
    },

    hallazgo: {
        icon: function(zoomLevel) {
            const base = Math.max(8, 14 - (15 - zoomLevel));
            const size = base * 2; // double the original size
            return L.divIcon({
            className: 'custom-fa-marker',
            html: `<i class="fa-solid fa-question" style="font-size: ${size}px; color: #10d499ff;"></i>`,
            iconSize: [size, size],
            iconAnchor: [size / 4, size / 4],
            pane: 'points'
            });
        }
    },

    hEvento: {
        icon: function(zoomLevel) {
            const base = Math.max(8, 14 - (15 - zoomLevel));
            const size = base * 2; // double the original size
            return L.divIcon({
            className: 'custom-fa-marker',
            html: `<i class="fa-solid fa-question" style="font-size: ${size}px; color: #10d499ff;"></i>`,
            iconSize: [size, size],
            iconAnchor: [size / 4, size / 4],
            pane: 'points'
            });
        }
    },


    hProcesoMenor: {
        icon: function(zoomLevel) {
            const base = Math.max(8, 14 - (15 - zoomLevel));
            const size = base * 2; // double the original size
            return L.divIcon({
            className: 'custom-fa-marker',
            html: `<i class="fa-solid fa-question" style="font-size: ${size}px; color: #10d499ff;"></i>`,
            iconSize: [size, size],
            iconAnchor: [size / 4, size / 4],
            pane: 'points'
            });
        }
    },

    CruceAereo: {
        icon: function(zoomLevel) {
            const base = Math.max(8, 14 - (15 - zoomLevel));
            const size = base * 2; // double the original size
            return L.divIcon({
            className: 'custom-fa-marker',
            html: `<i class="fa-solid fa-plane" style="font-size: ${size}px; color: #10c7d4ff;"></i>`,
            iconSize: [size, size],
            iconAnchor: [size / 4, size / 4],
            pane: 'points'
            });
        }
    },


    CruceSubfluvial: {
        icon: function(zoomLevel) {
            const base = Math.max(8, 14 - (15 - zoomLevel));
            const size = base * 2; // double the original size
            return L.divIcon({
                className: 'custom-fa-marker',
                html: `<i class="fa-solid fa-signs-post" style="font-size: ${size}px; color: #0848f7ff;"></i>`,
                iconSize: [size, size],
                iconAnchor: [size / 1, size / 1],
                pane: 'points'
            });
        }
    },

    polyline1: { color: '#28ec0eff', weight: 4, opacity: 0.9, pane: 'polylines' },
    polyline2: { color: '#0c9ba0ff', weight: 4, opacity: 0.9, pane: 'polylines' },

    polygon: { 
        fillColor: '#EDED0E', 
        weight: 1, 
        color: '#EDBD0E',
        fillOpacity: 0.3,
        pane: 'polygons'
    },
    AnchoDDV: { 
        fillColor: '#92067bff', 
        weight: 1, 
        color: '#92067bff',
        fillOpacity: 0.3,
        pane: 'polygons'
    },
    Buffer200: { 
        fillColor: '#c683ecff', 
        weight: 1, 
        color: '#c683ecff',
        fillOpacity: 0.3,
        pane: 'polygons'
    },
    /* add Style for Veredas y Municipios */
    veredas: {
        fillColor: '#EDED0E',
        color: '#C8B800',
        weight: 1,
        fillOpacity: 0.3,
        pane: 'polygons'
    },
    municipios: {
        fillColor: '#378290',
        color: '#276070',
        weight: 1,
        fillOpacity: 0.3,
        pane: 'polygons'
    },
};

// SYMBOLOGY COLOR FOR PROGRAMACION LAYER
const programacionColors = {
    'IEDDV_RECORRIDO': '#12c002ff',
    'IEDDV_ESTRUCTURACION': '#fac107',
    'IEDDV_PROGRAMADO': '#e4a0d8',
    'NT_RECORRIDO': '#0E30EE',
    'NT_ESTRUCTURACION': '#0ed4ee',
    'NT_PROGRAMADO': '#9c0eee'
};

function getProgramacionStyle(feature) {
    const key = `${feature.properties?.SERVICIO}_${feature.properties?.ESTADO}`;
    return {
        color: programacionColors[key] || '#999999',
        weight: 4,
        opacity: 0.9,
        pane: 'polylines'
    };
}

function buildProgramacionLegend() {
    const container = document.querySelector('.programacion-legend-items');
    if (!container) return;

    container.innerHTML = '';

    Object.entries(programacionColors).forEach(([key, color]) => {
        const [servicio, estado] = key.split('_');

        const item = document.createElement('div');
        item.className = 'programacion-legend-item';

        const swatch = document.createElement('span');
        swatch.className = 'programacion-legend-color';
        swatch.style.backgroundColor = color;

        const label = document.createElement('span');
        label.textContent = `${servicio} – ${estado}`;

        item.appendChild(swatch);
        item.appendChild(label);
        container.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buildProgramacionLegend();
});


// Create layer groups
const layers = {
    point: L.layerGroup().addTo(map),
    programacion: L.layerGroup().addTo(map),
    polyline1: L.layerGroup(),
    polyline2: L.layerGroup(),
    polygon: L.layerGroup().addTo(map),
    pointLabels: L.layerGroup(),
    polylineLabels: L.layerGroup(),
    polygonLabels: L.layerGroup()
};


// Add Veredas, Municipios and Procesos layers
const veredasLayer = L.layerGroup();
const municipiosLayer = L.layerGroup();
const AnchoDDV = L.layerGroup();
const Buffer200 = L.layerGroup();
const eventoCluster = L.markerClusterGroup({ chunkedLoading: true }); // for performance
const procesosCluster = L.markerClusterGroup({ chunkedLoading: true }); // for performance
const edificacionCluster = L.markerClusterGroup({ chunkedLoading: true }); // for performance
const hallazgoCluster = L.markerClusterGroup({ chunkedLoading: true });// for performance
const hProcesoMenorCluster = L.markerClusterGroup({ chunkedLoading: true });// for performance
const hEventoCluster = L.markerClusterGroup({ chunkedLoading: true });// for performance
const CruceAereoCluster = L.markerClusterGroup({ chunkedLoading: true }); // for performance
const CruceSubfluvialCluster = L.markerClusterGroup({ chunkedLoading: true }); // for performance

// Add checkbox toggles
function setupLazyToggle(id, layer, options = {}) {
    const checkbox = document.getElementById(id);
    if (!checkbox) return;

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            if (layer.getLayers().length === 0 && options.lazyUrl) {
                if (options.isCluster) {
                    fetch(options.lazyUrl)
                        .then(res => res.json())
                        .then(data => {
                            const clusterLayer = L.geoJSON(data, {
                                pointToLayer: (feature, latlng) => {
                                    const marker = L.marker(latlng, {
                                        icon: (options.style?.icon || styles.point.icon)(map.getZoom()),
                                        pane: 'points'
                                    });

                                    feature.layerType = 'point';
                                    feature.layer = marker;
                                    allFeatures.push(feature);

                                    return marker.bindPopup(
                                        Object.entries(feature.properties)
                                            .map(([k, v]) => `<b>${k}:</b> ${v}`)
                                            .join('<br>')
                                    );
                                }
                            });

                            layer.addLayer(clusterLayer);
                            buildSearchIndex(allFeatures);
                            map.addLayer(layer);
                        });
                } else {
                    loadGeoJSON(options.lazyUrl, layer, options.style, options.labelField, options.layerType);
                    map.addLayer(layer);
                }
            } else {
                map.addLayer(layer);
            }
        } else {
            map.removeLayer(layer);
        }
    });
}

function getProgramacionStyle(feature) {
    const key = `${feature.properties?.SERVICIO}_${feature.properties?.ESTADO}`;
    return {
        color: programacionColors[key] || '#999999',
        weight: 4,
        opacity: 0.9,
        pane: 'polylines'
    };
}

// Lazy load layers only when user activates them
setupLazyToggle('veredas-layer-toggle', veredasLayer, {
    lazyUrl: 'geojs/Veredas.geojson',
    style: styles.veredas,
    labelField: 'VEREDA',
    layerType: 'polygon'
});

setupLazyToggle('municipios-layer-toggle', municipiosLayer, {
    lazyUrl: 'geojs/Municipio.geojson',
    style: styles.municipios,
    labelField: 'MUNICIPIO',
    layerType: 'polygon'
});

setupLazyToggle('AnchoDDV-layer-toggle', AnchoDDV, {
    lazyUrl: 'geojs/AnchoDDV.geojson',
    style: styles.AnchoDDV,
    labelField: 'TRAMO',
    layerType: 'polygon'
});

setupLazyToggle('Buffer200-layer-toggle', Buffer200, {
    lazyUrl: 'geojs/Buffer200.geojson',
    style: styles.Buffer200,
    labelField: 'TRAMO',
    layerType: 'polygon'
});

setupLazyToggle('evento-layer-toggle', eventoCluster, {
    lazyUrl: 'geojs/EVENTO_GEOTECNICO.geojson',
    style: styles.evento,
    labelField: 'PK_PAT',
    layerType: 'point',
    isCluster: true
});

setupLazyToggle('procesos-layer-toggle', procesosCluster, {
    lazyUrl: 'geojs/PROCESO_MENOR.geojson',
    style: styles.procesomenor,
    labelField: 'PK_PAT',
    layerType: 'point',
    isCluster: true
});

setupLazyToggle('edificacion-layer-toggle', edificacionCluster,{
    lazyUrl: 'geojs/OCUPACION.geojson',
    style: styles.edificacion,
    labelField: 'PK_CAMPO',
    layerType: 'point',
    isCluster: true
});

setupLazyToggle('hallazgos-layer-toggle', hallazgoCluster, {
  lazyUrl: 'geojs/Hallazgos/URL_Hallazgos.geojson',
  style: styles.hallazgo,
  labelField: 'PK',
  layerType: 'point'
});

setupLazyToggle('hProcesoMenor-layer-toggle', hProcesoMenorCluster, {
  lazyUrl: 'geojs/Hallazgos/URL_ProcesosMenores.geojson',
  style: styles.hProcesoMenor,
  labelField: 'PK',
  layerType: 'point'
});

setupLazyToggle('hEvento-layer-toggle', hEventoCluster, {
  lazyUrl: 'geojs/Hallazgos/URL_Eventos.geojson',
  style: styles.hEvento,
  labelField: 'PK',
  layerType: 'point'
});

setupLazyToggle('CruceAereo-layer-toggle', CruceAereoCluster, {
    lazyUrl: 'geojs/CRUCE_AEREO.geojson',
    style: styles.CruceAereo,
    labelField: 'PK',
    layerType: 'point',
    isCluster: true
});

setupLazyToggle('CruceSubfluvial-layer-toggle', CruceSubfluvialCluster, {
    lazyUrl: 'geojs/CRUCE_SUBFLUVIAL.geojson',
    style: styles.CruceSubfluvial,
    labelField: 'PK',
    layerType: 'point',
    isCluster: true
});

// Función para construir el índice de búsqueda
function buildSearchIndex(features) {
    searchIndex = features.flatMap(feature => {
        if (!feature.properties) return [];
        
        return Object.entries(feature.properties).map(([key, value]) => ({
            feature,
            key,
            value: String(value).toLowerCase(),
            layerType: feature.layerType
        }));
    });
}

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

// Store point layers for zoom updates
const pointLayers = [];
let allFeatures = []; // Almacenará todas las características para búsqueda
let searchIndex = []; // <-- Añade esta línea

// Dashboard
const allPolylineFeatures = [];
// const allFeatures = [];

function loadGeoJSON(url, layer, style, labelField, layerType = 'polygon') {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            layer.clearLayers();

            const geoJSONLayer = L.geoJSON(data, {
                pointToLayer: (feature, latlng) => {
                    if (layerType === 'point') {
                        const marker = L.marker(latlng, {
                            icon: style?.icon ? style.icon(map.getZoom()) : undefined,
                            pane: 'points'
                        });
                        pointLayers.push(marker);

                        feature.layerType = 'point';
                        feature.layer = marker;
                        allFeatures.push(feature);

                        return marker;
                    }
                    return L.circleMarker(latlng, style);
                },
                // ✅ SUPPORT STATIC STYLE OBJECT OR STYLE FUNCTION
                style: feature => {
                    return (typeof style === 'function')
                        ? style(feature)
                        : style;
                },
                onEachFeature: (feature, layerObj) => {
                    layerObj.feature = feature;
                    feature.layer = layerObj;
                    feature.layerType = layerType;
                    allFeatures.push(feature);

                    if (layerType === 'polyline') {
                        allPolylineFeatures.push(feature);
                    }

                    // ================= POPUP =================
                    if (feature.properties) {
                        let popupContent = '<div class="info"><h4>Información</h4>';

                        for (const prop in feature.properties) {
                            const val = feature.properties[prop];
                            if (!prop.startsWith('VISUALIZAR_IMAGEN')) {
                                popupContent += `<b>${prop}:</b> ${val}<br>`;
                            }
                        }

                        const pictureFields = [
                            'VISUALIZAR_IMAGEN_1',
                            'VISUALIZAR_IMAGEN_2',
                            'VISUALIZAR_IMAGEN_3'
                        ];

                        pictureFields.forEach((p, i) => {
                            const val = feature.properties[p];
                            if (val) {
                                const cleanUrl = convertToPublicUrl(val);
                                popupContent += `<a href="${cleanUrl}" target="_blank">
                                    <b>📷 Ver Picture_${i + 1}</b></a><br>`;
                            }
                        });

                        popupContent += '</div>';
                        layerObj.bindPopup(popupContent);
                    }

                    // ================= LABELS =================
                    if (labelField && feature.properties?.[labelField]) {
                        const position =
                            layerObj.getBounds?.().getCenter() ||
                            layerObj.getLatLng?.();

                        if (!position) return;

                        const appliedStyle = (typeof style === 'function')
                            ? style(feature)
                            : style;

                        const labelColor =
                            layerType === 'polygon' ? '#000307' :
                            layerType === 'polyline' ? appliedStyle.color :
                            '#ff0000';

                        const label = L.marker(position, {
                            icon: L.divIcon({
                                className: 'map-label',
                                html: `<div style="
                                    font-size:12px;
                                    font-weight:bold;
                                    color:${labelColor};
                                    text-shadow:
                                      -1px -1px 0 #fff,
                                       1px -1px 0 #fff,
                                      -1px  1px 0 #fff,
                                       1px  1px 0 #fff;">
                                    ${feature.properties[labelField]}
                                </div>`,
                                iconSize: [100, 20],
                                pane: 'labels'
                            }),
                            interactive: false
                        });

                        const labelLayer =
                            layerType === 'polygon' ? layers.polygonLabels :
                            layerType === 'polyline' ? layers.polylineLabels :
                            layers.pointLabels;

                        labelLayer.addLayer(label);
                    }

                    // ================= HOVER HIGHLIGHT =================
                    const baseStyle = (typeof style === 'function')
                        ? style(feature)
                        : style;

                    const highlightStyle = {
                        weight: (baseStyle.weight || 2) + 2,
                        color: baseStyle.color || '#f00',
                        opacity: 1,
                        dashArray: ''
                    };

                    layerObj.on('mouseover', function () {
                        this.setStyle(highlightStyle);
                        this.bringToFront();
                    });

                    layerObj.on('mouseout', function () {
                        this.setStyle(baseStyle);
                    });
                }
            });

            geoJSONLayer.eachLayer(l => layer.addLayer(l));
            buildSearchIndex(allFeatures);
        })
        .catch(console.error);
}

// === CONVERT ONEDRIVE LINK TO PUBLIC PREVIEW ===
function convertToPublicUrl(rawUrl) {
    try {
        if (!rawUrl.includes('1drv.ms') && !rawUrl.includes('sharepoint.com')) return rawUrl;

        if (rawUrl.includes('1drv.ms')) {
            return rawUrl.replace('1drv.ms', 'onedrive.live.com').replace('?e=', '?download=1');
        }

        if (rawUrl.includes('sharepoint.com')) {
            const base = rawUrl.split('?')[0];
            return base + '?raw=1';
        }

        return rawUrl;
    } catch (e) {
        console.warn('Invalid OneDrive URL:', rawUrl);
        return rawUrl;
    }
}

// === Checkbox logic to lazily load building and point labels ===
const buildingLabelLayer = L.layerGroup();
const eventoLabelLayer = L.layerGroup();
const pointLabelLayer = L.layerGroup();
const hallazgosLabelLayer = L.layerGroup();
const hProcesoMenorLabelLayer = L.layerGroup();
const hEventoLabelLayer = L.layerGroup();
const CruceAereoLabelLayer = L.layerGroup();
const CruceSubfluvialLabelLayer = L.layerGroup();
function setupLabelToggle(toggleId, geojsonUrl, labelLayer, labelField, style, areaCheckFunction) {
    const checkbox = document.getElementById(toggleId);
    if (!checkbox) return;

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            if (labelLayer.getLayers().length === 0) {
                // Lazy load labels within current map bounds if areaCheckFunction is defined
                fetch(geojsonUrl)
                    .then(res => res.json())
                    .then(data => {
                        labelLayer.clearLayers();

                        L.geoJSON(data, {
                            filter: feature => {
                                const latlng = feature.geometry.type === 'Point'
                                    ? L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
                                    : null;
                                return !areaCheckFunction || (latlng && areaCheckFunction(latlng));
                            },
                            onEachFeature: (feature, layer) => {
                                const latlng = layer.getLatLng?.();
                                if (!latlng) return;

                                const label = L.marker(latlng, {
                                    icon: L.divIcon({
                                        className: 'map-label',
                                        html: `<div style="font-size:12px;font-weight:bold;color:${style?.color || '#000'};
                                            text-shadow:-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff;">
                                            ${feature.properties?.[labelField] || ''}</div>`
                                    }),
                                    interactive: false
                                });

                                labelLayer.addLayer(label);
                            }
                        });
                        
                        map.addLayer(labelLayer);
                    });
            } else {
                map.addLayer(labelLayer);
            }
        } else {
            map.removeLayer(labelLayer);
        }
        
    });
}

// Setup the lazy label checkboxes
setupLabelToggle('edificacion-labels-toggle', 'geojs/OCUPACION.geojson', buildingLabelLayer, 'PK_CAMPO', styles.edificacion, latlng => map.getBounds().contains(latlng));
setupLabelToggle('eventos-labels-toggle', 'geojs/EVENTO_GEOTECNICO.geojson', eventoLabelLayer, 'PK_PAT', styles.evento, latlng => map.getBounds().contains(latlng));
setupLabelToggle('procesomenor-labels-toggle', 'geojs/PROCESO_MENOR.geojson', pointLabelLayer, 'PK_PAT', styles.procesomenor, latlng => map.getBounds().contains(latlng));

setupLabelToggle('hallazgos-labels-toggle', 'geojs/Hallazgos/URL_Hallazgos.geojson', hallazgosLabelLayer, 'PK', styles.hallazgo, latlng => map.getBounds().contains(latlng));
setupLabelToggle('hProcesoMenor-labels-toggle', 'geojs/Hallazgos/URL_ProcesosMenores.geojson', hProcesoMenorLabelLayer, 'PK', styles.hProcesoMenor, latlng => map.getBounds().contains(latlng));
setupLabelToggle('hEvento-labels-toggle', 'geojs/Hallazgos/URL_Eventos.geojson', hEventoLabelLayer, 'PK', styles.hEvento, latlng => map.getBounds().contains(latlng));

setupLabelToggle('CruceAereo-labels-toggle', 'geojs/CRUCE_AEREO.geojson', CruceAereoLabelLayer, 'PK', styles.CruceAereo, latlng => map.getBounds().contains(latlng));
setupLabelToggle('CruceSubfluvial-labels-toggle', 'geojs/CRUCE_SUBFLUVIAL.geojson', CruceSubfluvialLabelLayer, 'PK', styles.CruceSubfluvial, latlng => map.getBounds().contains(latlng));

// Load GeoJSON data
loadGeoJSON('geojs/2026/RECORRIDO_2026.geojson', layers.programacion, getProgramacionStyle, 'TRAMO', 'polyline');
loadGeoJSON('geojs/AnchoDDV.geojson', layers.AnchoDDV, styles.AnchoDDV, 'TRAMO', 'polygon');
loadGeoJSON('geojs/Buffer200.geojson', layers.Buffer200, styles.Buffer200, 'TRAMO', 'polygon');
loadGeoJSON('geojs/DUCTO_RECORRIDO_IEDDV_20250702.geojson', layers.polyline1, styles.polyline1, 'TRAMO', 'polyline');
loadGeoJSON('geojs/DUCTO_RECORRIDO_NT_20250702.geojson', layers.polyline2, styles.polyline2, 'TRAMO', 'polyline');

// Update point icons on zoom

map.on('zoomend', function() {
    const zoom = map.getZoom();
    pointLayers.forEach(marker => {
        marker.setIcon(styles.point.icon(zoom));
    });
});

// ==============================================
// SEARCH FUNCTIONALITY
// ==============================================

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
let searchTimeout; // <-- Añade esta línea aquí

// Event listeners para la búsqueda
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout); // <-- Modifica este listener
    searchTimeout = setTimeout(() => {
        searchFeatures(e.target.value);
    }, 300);
});

// Función para buscar en las características
function searchFeatures(query) {
    if (!query || query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }

    // Mostrar mensaje de carga
    searchResults.innerHTML = '<div class="search-loading">Buscando...</div>';
    searchResults.style.display = 'block';

    // Retrasar la búsqueda para permitir que se muestre el mensaje
    setTimeout(() => {
        const resultsMap = new Map();
        const queryLower = query.toLowerCase();
        
        searchIndex.forEach(item => {
            if (item.value.includes(queryLower)) {
                resultsMap.set(item.feature, {
                    feature: item.feature,
                    property: item.key,
                    value: item.feature.properties[item.key],
                    layerType: item.layerType
                });
            }
        });

        displayResults(Array.from(resultsMap.values()));
    }, 0);
}

// Mostrar resultados en el dropdown
function displayResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'search-result-item';
        noResults.textContent = 'No se encontraron resultados';
        searchResults.appendChild(noResults);
    } else {
        results.slice(0, 10).forEach(result => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            
            // Mostrar el valor de la propiedad que coincidió
            item.textContent = result.value;
            
            // Almacenar referencia al feature para cuando se seleccione
            item.dataset.featureIndex = allFeatures.indexOf(result.feature);
            
            item.addEventListener('click', () => {
                selectResult(result.feature);
            });
            searchResults.appendChild(item);
        });
    }
    searchResults.style.display = results.length > 0 ? 'block' : 'none';
}

// Seleccionar un resultado y centrar el mapa en él
function selectResult(feature) {
    // Limpiar estilos anteriores
    allFeatures.forEach(f => {
        if (f.layer.setStyle) {
            f.layer.setStyle(styles[f.layerType] || {});
        }
    });

    // Resaltar el feature seleccionado
    if (feature.layer.setStyle) {
        feature.layer.setStyle({
            color: '#FF00FF',
            weight: 5,
            fillOpacity: 0.7
        });
        
        // Quitar el resaltado después de 5 segundos
        setTimeout(() => {
            feature.layer.setStyle(styles[feature.layerType] || {});
        }, 5000);
    }
    searchResults.style.display = 'none';
    searchInput.value = ''; // Opcional: limpiar el input después de seleccionar
    let latlng;
    
    // Obtener la posición según el tipo de capa
    if (feature.layerType === 'point') {
        latlng = feature.layer.getLatLng();
    } else {
        // Para polígonos y polilíneas, usar el centro del bounds
        latlng = feature.layer.getBounds().getCenter();
    }
    
    // Centrar el mapa y abrir el popup si existe
    map.setView(latlng, 15);
    
    if (feature.layer.getPopup) {
        feature.layer.openPopup();
    }
}

// Event listeners para la búsqueda
searchInput.addEventListener('input', (e) => {
    searchFeatures(e.target.value);
});

searchButton.addEventListener('click', () => {
    searchFeatures(searchInput.value);
});

// Cerrar los resultados cuando se hace clic fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-control')) {
        searchResults.style.display = 'none';
    }
});

// Permitir navegación con teclado en los resultados
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
        const items = searchResults.querySelectorAll('.search-result-item');
        if (items.length === 0) return;
        
        let currentIndex = -1;
        
        // Encontrar el ítem actualmente seleccionado
        items.forEach((item, index) => {
            if (item.classList.contains('selected')) {
                currentIndex = index;
                item.classList.remove('selected');
            }
        });
        
        if (e.key === 'ArrowDown') {
            currentIndex = (currentIndex + 1) % items.length;
        } else if (e.key === 'ArrowUp') {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
        } else if (e.key === 'Enter' && currentIndex !== -1) {
            items[currentIndex].click();
            return;
        }
        
        if (currentIndex >= 0) {
            items[currentIndex].classList.add('selected');
            items[currentIndex].scrollIntoView({ block: 'nearest' });
        }
    }
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

// setupToggle('point-layer-toggle', layers.point);
setupToggle('programacion-layer-toggle', layers.programacion);
setupToggle('polyline1-layer-toggle', layers.polyline1);
setupToggle('polyline2-layer-toggle', layers.polyline2);
// setupToggle('polygon-layer-toggle', layers.polygon);
// setupToggle('point-labels-toggle', layers.pointLabels);
setupToggle('polyline-labels-toggle', layers.polylineLabels);
// setupToggle('polygon-labels-toggle', layers.polygonLabels);

// ==============================================
// COLLAPSIBLE SECTIONS
// ==============================================

document.querySelectorAll('.control-section.collapsible').forEach(section => {
    const header = section.querySelector('.section-header');
    const content = section.querySelector('.section-content');
    const icon = header.querySelector('i');
    
// Initial state (collapsed if not-active)
  if (section.classList.contains('not-active')) {
    content.style.maxHeight = '0px';
    icon.classList.add('fa-chevron-down');
    icon.classList.remove('fa-chevron-up');
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.classList.add('fa-chevron-up');
    icon.classList.remove('fa-chevron-down');
  }

  // Toggle on click
  header.addEventListener('click', () => {
    const isOpen = section.classList.toggle('active');
    section.classList.remove('not-active');

    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.classList.add('fa-chevron-up');
      icon.classList.remove('fa-chevron-down');
    } else {
      content.style.maxHeight = '0px';
      icon.classList.add('fa-chevron-down');
      icon.classList.remove('fa-chevron-up');
    }
  });
});


// ==============================================
// Search by Coordinates
// ==============================================
let coordMarker = null;

document.getElementById('coord-search-btn').addEventListener('click', () => {
  const lat = parseFloat(document.getElementById('coord-lat').value);
  const lng = parseFloat(document.getElementById('coord-lng').value);

  if (isNaN(lat) || isNaN(lng)) {
    alert('Por favor, ingrese coordenadas válidas (números).');
    return;
  }

  const latlng = L.latLng(lat, lng);

  // Remove previous marker
  if (coordMarker) {
    map.removeLayer(coordMarker);
  }

  coordMarker = L.marker(latlng, {
    icon: L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      iconSize: [28, 28],
      iconAnchor: [14, 28]
    })
  }).addTo(map);

  coordMarker.bindPopup(`📍 Coordenadas:<br><b>Lat:</b> ${lat}<br><b>Lng:</b> ${lng}`).openPopup();

  map.setView(latlng, 16);
});

// ==============================================
// MEASUREMENT TOOL
// ==============================================

// Improved measurement tool implementation
let measureControl = {
    isMeasuring: false,
    currentPolyline: null,
    totalDistance: 0,
    measurePoints: [],
    measureTooltips: [],

    start: function() {
        // Clear any previous measurements
        this.clearMeasurement();
        
        this.isMeasuring = true;
        document.getElementById('measure-toggle').classList.add('active');
        document.getElementById('measure-result').style.display = 'block';
        document.getElementById('measure-value').textContent = '0';
        
        // Start with first click
        map.on('click', this.handleMeasureClick);
    },

    stop: function() {
        this.isMeasuring = false;
        document.getElementById('measure-toggle').classList.remove('active');
        document.getElementById('measure-result').style.display = 'none';
        map.off('click', this.handleMeasureClick);
        this.clearMeasurement();
    },

    handleMeasureClick: function(e) {
        if (!measureControl.isMeasuring) return;
        
        // Add point to current measurement
        measureControl.measurePoints.push(e.latlng);
        
        // Update or create polyline
        if (measureControl.measurePoints.length > 1) {
            if (!measureControl.currentPolyline) {
                measureControl.currentPolyline = L.polyline([], {
                    color: 'red',
                    weight: 3
                }).addTo(map);
            }
            measureControl.currentPolyline.setLatLngs(measureControl.measurePoints);
            
            // Calculate and display distance
            const lastSegmentDistance = measureControl.measurePoints[measureControl.measurePoints.length-2]
                .distanceTo(measureControl.measurePoints[measureControl.measurePoints.length-1]) / 1000;
            measureControl.totalDistance += lastSegmentDistance;
            
            document.getElementById('measure-value').textContent = measureControl.totalDistance.toFixed(2);
            
            // Add tooltip for this segment
            const tooltip = L.tooltip({
                permanent: true,
                direction: 'top',
                className: 'measure-tooltip',
                content: `${lastSegmentDistance.toFixed(2)} km<br>Total: ${measureControl.totalDistance.toFixed(2)} km`
            }).setLatLng(e.latlng);
            
            tooltip.addTo(map);
            measureControl.measureTooltips.push(tooltip);
        }
    },

    clearMeasurement: function() {
        // Remove existing polyline
        if (this.currentPolyline) {
            map.removeLayer(this.currentPolyline);
            this.currentPolyline = null;
        }
        
        // Remove all tooltips
        this.measureTooltips.forEach(tooltip => map.removeLayer(tooltip));
        this.measureTooltips = [];
        
        // Reset measurements
        this.measurePoints = [];
        this.totalDistance = 0;
    }
};

// Toggle measurement tool
document.getElementById('measure-toggle').addEventListener('click', function() {
    if (measureControl.isMeasuring) {
        measureControl.stop();
    } else {
        measureControl.start();
    }
});

// Add right-click to finish measurement
map.on('contextmenu', function() {
    if (measureControl.isMeasuring) {
        measureControl.stop();
    }
});

// ==============================================
// Statistics Dashboards
// ==============================================

const statsControl = {
    calculate: function () {
        const layer = document.getElementById('stats-layer-select').value;
        const groupField = document.getElementById('stats-field-select').value;
        const attributeFilter = document.getElementById('attribute-filter').value.trim().toLowerCase();
        const minLength = parseFloat(document.getElementById('min-length')?.value) || 0;
        const maxLength = parseFloat(document.getElementById('max-length')?.value) || Infinity;

        let features = layer === 'all'
            ? allPolylineFeatures
            : layers[layer].getLayers().map(l => l.feature).filter(f => f);

        const result = {};
        let total = 0;

        for (const feat of features) {
            if (!feat?.properties) continue;

            if (attributeFilter) {
                const values = Object.values(feat.properties).map(v => String(v).toLowerCase());
                const match = values.some(v => v.includes(attributeFilter));
                if (!match) continue;
            }

            const length = parseFloat(feat.properties.LONGITUD) || 0;
            if (length < minLength || length > maxLength) continue;

            const group = feat.properties[groupField] || 'Sin valor';
            if (!result[group]) {
                result[group] = { count: 0, length: 0 };
            }

            result[group].count++;
            result[group].length += length;
            total += length;
        }

        const container = document.getElementById('stats-summary');
        container.innerHTML = `<h4>Resumen por ${groupField}</h4>
          <p>Total elementos: ${Object.values(result).reduce((s, r) => s + r.count, 0)}</p>
          <p>Longitud total: ${total.toFixed(2)} km</p>`;

        for (const [key, val] of Object.entries(result)) {
            const avg = val.length / val.count;
            const percent = (val.length * 100 / total).toFixed(1);

            container.innerHTML += `<div class='group-stats'>
              <h5>${key}</h5>
              <p>Cantidad: ${val.count}</p>
              <p>Longitud total: ${val.length.toFixed(2)} km</p>
              <p>Promedio: ${avg.toFixed(2)} km</p>
              <p>% del total: ${percent}%</p>
            </div>`;
        }

        this.exportData = result;
    },

    exportToExcel: function () {
        const features = document.getElementById('stats-layer-select').value === 'all'
            ? allPolylineFeatures
            : layers[document.getElementById('stats-layer-select').value]
                .getLayers()
                .map(l => l.feature)
                .filter(f => f);

        if (features.length === 0) {
            alert("No hay datos para exportar.");
            return;
        }

        // Build header (union of all keys)
        const allKeys = new Set();
        features.forEach(f => {
            if (f?.properties) {
            Object.keys(f.properties).forEach(k => allKeys.add(k));
            }
        });

        const headers = Array.from(allKeys);
        const rows = [headers];

        // Add feature property rows
        features.forEach(f => {
            const row = headers.map(key => f.properties?.[key] ?? '');
            rows.push(row);
        });

        // Convert to sheet and export
        const ws = XLSX.utils.aoa_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'GeoJSON Atributos');
        XLSX.writeFile(wb, 'Estadísticas_Avance_IEDDV.xlsx');
    }
};

document.getElementById('apply-stats-btn').addEventListener('click', () => statsControl.calculate());
document.getElementById('stats-toggle').addEventListener('click', () => {
document.getElementById('stats-panel').classList.toggle('active');
});
document.getElementById('export-stats-btn').addEventListener('click', () => statsControl.exportToExcel());

function populateAttributeSuggestions() {
  const datalist = document.getElementById('attribute-suggestions');
  const seen = new Set();

  allPolylineFeatures.forEach(feature => {
    Object.values(feature.properties).forEach(value => {
      const str = String(value).trim();
      if (str.length > 0 && !seen.has(str)) {
        seen.add(str);
        const option = document.createElement('option');
        option.value = str;
        datalist.appendChild(option);
      }
    });
  });
}

setTimeout(() => {
  statsControl.calculate();
  populateAttributeSuggestions();
}, 2000);

// ==============================================
// COORDINATE DISPLAY
// ==============================================

let coordFormat = 'dms';

function decimalToDMS(decimal, isLongitude) {
    const absolute = Math.abs(decimal);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
    
    const direction = isLongitude ? (decimal >= 0 ? 'E' : 'W') : (decimal >= 0 ? 'N' : 'S');
    
    return `${degrees}°${minutes.toString().padStart(2, '0')}'${seconds.toString().padStart(5, '0')}"${direction}`;
}

function formatCoordinate(value, isLongitude) {
    return coordFormat === 'decimal' ? 
        value.toFixed(6) + '°' : 
        decimalToDMS(value, isLongitude);
}

function updateCoordinateDisplay(latlng) {
    document.getElementById('latitude').textContent = formatCoordinate(latlng.lat, false);
    document.getElementById('longitude').textContent = formatCoordinate(latlng.lng, true);
}

map.on('mousemove', (e) => updateCoordinateDisplay(e.latlng));
map.on('mouseout', () => updateCoordinateDisplay(map.getCenter()));

document.getElementById('coord-format').addEventListener('change', (e) => {
    coordFormat = e.target.value;
    updateCoordinateDisplay(map.getCenter());
});

// Initialize coordinate display
updateCoordinateDisplay(map.getCenter());

// ==============================================
// LEGEND
// ==============================================

// const legend = L.control({ position: 'bottomright' });
// legend.onAdd = function() {
//     const div = L.DomUtil.create('div', 'legend');
//     div.innerHTML = `
//         <h4>Leyenda</h4>
//         <div><i style="background:${styles.polyline1.color}"></i> Ducto C1</div>
//         <div><i style="background:${styles.polyline2.color}"></i> Ducto C2</div>
//         <div><i style="background:${styles.polyline3.color}"></i> Ducto C3</div>
//         <div><i style="background:${styles.polyline4.color}"></i> Ducto C4</div>
//         <div><i style="background:${styles.polygon.fillColor}"></i> Veredas</div>
//         <div><i class="fa-regular fa-plus" style="color:#EE8C0B"></i> Edificaciones</div>
//     `;
//     return div;
// };
// legend.addTo(map);