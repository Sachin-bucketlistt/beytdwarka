import { useEffect, useRef } from 'react'
import { Map, Marker, NavigationControl } from 'maplibre-gl'
import { ISLAND_OUTLINE } from './islandOutline.js'
import 'maplibre-gl/dist/maplibre-gl.css'

const BEYT = [22.4524, 69.1186]
const OKHA = [22.4674, 69.0702]
const BRIDGE = [22.4608, 69.0826]
const DWARKA = [22.2376, 68.9674]
const JAMNAGAR = [22.4655, 70.0126]
const RAJKOT = [22.3092, 70.7795]

const ISLAND_RING = ISLAND_OUTLINE.map(([lat, lng]) => [lng, lat])

const PINS = {
  air: [
    { label: 'Beyt Dwarka', position: BEYT, featured: true },
    { label: 'Jamnagar Airport', position: JAMNAGAR },
    { label: 'Rajkot Airport', position: RAJKOT },
  ],
  train: [
    { label: 'Beyt Dwarka', position: BEYT, featured: true },
    { label: 'Okha Station', position: OKHA },
    { label: 'Sudarshan Setu', position: BRIDGE },
  ],
  road: [
    { label: 'Beyt Dwarka', position: BEYT, featured: true },
    { label: 'Dwarka', position: DWARKA },
    { label: 'Sudarshan Setu', position: BRIDGE },
  ],
}

const ROUTES = {
  air: [
    [RAJKOT, BEYT],
    [JAMNAGAR, BEYT],
  ],
  train: [[OKHA, BRIDGE], [BRIDGE, BEYT]],
  road: [
    [DWARKA, OKHA],
    [OKHA, BRIDGE],
    [BRIDGE, BEYT],
  ],
}

const CAMERAS = {
  air: {
    center: [69.95, 22.39],
    zoom: 7.12,
    pitch: 46,
    bearing: -10,
  },
  train: {
    center: [69.096, 22.458],
    zoom: 12.15,
    pitch: 54,
    bearing: -32,
  },
  road: {
    center: [69.04, 22.35],
    zoom: 9.2,
    pitch: 50,
    bearing: -16,
  },
}

const STYLE = {
  version: 8,
  sources: {
    satellite: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: 'Tiles © Esri',
    },
    terrain: {
      type: 'raster-dem',
      tiles: [
        'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
      ],
      encoding: 'terrarium',
      tileSize: 256,
      maxzoom: 15,
    },
    island: { type: 'geojson', data: emptyCollection() },
    routes: { type: 'geojson', data: emptyCollection() },
  },
  layers: [
    {
      id: 'satellite',
      type: 'raster',
      source: 'satellite',
      paint: {
        'raster-saturation': 0.18,
        'raster-contrast': 0.12,
        'raster-brightness-max': 1,
      },
    },
    {
      id: 'island-glow',
      type: 'fill',
      source: 'island',
      paint: {
        'fill-color': '#1f8fa0',
        'fill-opacity': 0.18,
      },
    },
    {
      id: 'island-line',
      type: 'line',
      source: 'island',
      paint: {
        'line-color': '#f4e4c1',
        'line-width': 2.4,
        'line-dasharray': [2.2, 1.4],
      },
    },
    {
      id: 'route-glow',
      type: 'line',
      source: 'routes',
      paint: {
        'line-color': '#f4e4c1',
        'line-width': 6,
        'line-opacity': 0.28,
        'line-blur': 1.2,
      },
    },
    {
      id: 'route-line',
      type: 'line',
      source: 'routes',
      paint: {
        'line-color': '#f7edd2',
        'line-width': 2.2,
        'line-opacity': 0.96,
      },
    },
  ],
}

function emptyCollection() {
  return { type: 'FeatureCollection', features: [] }
}

function curve(from, to, steps = 42) {
  const [lat1, lng1] = from
  const [lat2, lng2] = to
  const dx = lng2 - lng1
  const dy = lat2 - lat1
  const cx = (lng1 + lng2) / 2 - dy * 0.2
  const cy = (lat1 + lat2) / 2 + dx * 0.2

  return Array.from({ length: steps + 1 }, (_, index) => {
    const t = index / steps
    const u = 1 - t
    return [
      u * u * lng1 + 2 * u * t * cx + t * t * lng2,
      u * u * lat1 + 2 * u * t * cy + t * t * lat2,
    ]
  })
}

function straight(from, to) {
  return [
    [from[1], from[0]],
    [to[1], to[0]],
  ]
}

function routesGeo(active) {
  return {
    type: 'FeatureCollection',
    features: ROUTES[active].map((line) => ({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates:
          active === 'air' ? curve(line[0], line[1]) : straight(line[0], line[1]),
      },
    })),
  }
}

function islandGeo() {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: { type: 'Polygon', coordinates: [ISLAND_RING] },
      },
    ],
  }
}

function pinElement(label, featured) {
  const node = document.createElement('div')
  node.className = `reach-pin${featured ? ' is-featured' : ''}`
  node.innerHTML = `<span>${label}</span><i></i>`
  return node
}

function ReachMap({ active, reduced }) {
  const rootRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const activeRef = useRef(active)
  const reducedRef = useRef(reduced)

  activeRef.current = active
  reducedRef.current = reduced

  useEffect(() => {
    const root = rootRef.current
    if (!root || mapRef.current) return undefined

    const map = new Map({
      container: root,
      style: STYLE,
      center: [69.11, 22.45],
      zoom: 11.2,
      pitch: 50,
      bearing: -24,
      minZoom: 6.4,
      maxZoom: 16.5,
      maxBounds: [
        [68.28, 21.58],
        [71.55, 23.22],
      ],
      scrollZoom: false,
      attributionControl: false,
      fadeDuration: reduced ? 0 : 400,
    })

    map.addControl(
      new NavigationControl({ showCompass: false, visualizePitch: true }),
      'top-right',
    )

    mapRef.current = map

    const applyMode = (mode, instant) => {
      const camera = CAMERAS[mode]
      const motion = reducedRef.current || instant ? 0 : 1400
      const compact = window.matchMedia('(max-width: 1024px)').matches
      const padding = compact
        ? { top: 28, left: 18, right: 18, bottom: 22 }
        : { top: 36, left: 52, right: 24, bottom: 92 }

      map.getSource('island')?.setData(islandGeo())
      map.getSource('routes')?.setData(routesGeo(mode))
      map.setPaintProperty(
        'route-line',
        'line-dasharray',
        mode === 'air' ? [1.6, 1.4] : [1, 0.01],
      )

      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = PINS[mode].map((pin) =>
        new Marker({
          element: pinElement(pin.label, pin.featured),
          anchor: 'bottom',
        })
          .setLngLat([pin.position[1], pin.position[0]])
          .addTo(map),
      )

      map.easeTo({
        ...camera,
        padding,
        duration: motion,
        essential: true,
      })
    }

    const onLoad = () => {
      try {
        map.setTerrain({ source: 'terrain', exaggeration: 1.55 })
      } catch {
        map.setTerrain(null)
      }
      try {
        map.setSky({
          'sky-color': '#9ec9d6',
          'horizon-color': '#e7f0ee',
          'atmosphere-blend': 0.65,
        })
      } catch {
        /* sky is optional */
      }
      applyMode(activeRef.current, true)
    }
    map.on('load', onLoad)
    map.on('error', (event) => {
      const message = String(event.error || event.sourceId || '')
      if (message.includes('terrain') || event.sourceId === 'terrain') {
        try {
          map.setTerrain(null)
        } catch {
          /* ignore */
        }
      }
    })

    const resize = () => map.resize()
    const observer = new ResizeObserver(resize)
    observer.observe(root)
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      observer.disconnect()
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map?.isStyleLoaded()) return undefined

    const camera = CAMERAS[active]
    const compact = window.matchMedia('(max-width: 1024px)').matches
    const padding = compact
      ? { top: 28, left: 18, right: 18, bottom: 22 }
      : { top: 36, left: 52, right: 24, bottom: 92 }

    map.getSource('routes')?.setData(routesGeo(active))
    map.setPaintProperty(
      'route-line',
      'line-dasharray',
      active === 'air' ? [1.6, 1.4] : [1, 0.01],
    )

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = PINS[active].map((pin) =>
      new Marker({
        element: pinElement(pin.label, pin.featured),
        anchor: 'bottom',
      })
        .setLngLat([pin.position[1], pin.position[0]])
        .addTo(map),
    )

    if (reduced) {
      map.jumpTo({ ...camera, padding })
    } else {
      map.easeTo({ ...camera, padding, duration: 1400, essential: true })
    }

    return undefined
  }, [active, reduced])

  return <div ref={rootRef} className="reach__map" role="presentation" />
}

export default ReachMap
