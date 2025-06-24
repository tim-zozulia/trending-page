'use client'

import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Story } from '@/types/perigon'

interface MiniGlobeProps {
  stories: Story[]
  onCountryClick?: (country: string) => void
  selectedCountry?: string
}

export function MiniGlobe({ stories, onCountryClick, selectedCountry }: MiniGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const globeRef = useRef<THREE.Mesh>()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!mountRef.current || !isClient) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(200, 200)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const material = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    })

    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)

    const countryPositions = {
      US: { lat: 39.8283, lng: -98.5795 },
      UK: { lat: 55.3781, lng: -3.4360 },
      CA: { lat: 56.1304, lng: -106.3468 },
      DE: { lat: 51.1657, lng: 10.4515 },
      FR: { lat: 46.6034, lng: 1.8883 },
      JP: { lat: 36.2048, lng: 138.2529 },
      RU: { lat: 61.5240, lng: 105.3188 },
      CN: { lat: 35.8617, lng: 104.1954 },
      EU: { lat: 54.5260, lng: 15.2551 }
    }

    const countryCounts = stories.reduce((acc, story) => {
      story.countries.forEach(country => {
        acc[country] = (acc[country] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)

    Object.entries(countryCounts).forEach(([country, count]) => {
      const pos = countryPositions[country as keyof typeof countryPositions]
      if (pos) {
        const markerGeometry = new THREE.SphereGeometry(0.05 + count * 0.02, 8, 8)
        const markerMaterial = new THREE.MeshBasicMaterial({
          color: selectedCountry === country ? 0xff6b6b : 0x51cf66
        })
        const marker = new THREE.Mesh(markerGeometry, markerMaterial)

        const phi = (90 - pos.lat) * (Math.PI / 180)
        const theta = (pos.lng + 180) * (Math.PI / 180)

        marker.position.x = -(1.1 * Math.sin(phi) * Math.cos(theta))
        marker.position.z = (1.1 * Math.sin(phi) * Math.sin(theta))
        marker.position.y = (1.1 * Math.cos(phi))

        marker.userData = { country }
        scene.add(marker)
      }
    })

    camera.position.z = 3

    const animate = () => {
      requestAnimationFrame(animate)
      if (globe) {
        globe.rotation.y += 0.005
      }
      renderer.render(scene, camera)
    }
    animate()

    const handleClick = (event: MouseEvent) => {
      if (!onCountryClick) return

      const rect = renderer.domElement.getBoundingClientRect()
      const mouse = new THREE.Vector2()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)

      const markers = scene.children.filter(child => child.userData.country)
      const intersects = raycaster.intersectObjects(markers)

      if (intersects.length > 0) {
        const country = intersects[0].object.userData.country
        onCountryClick(country)
      }
    }

    renderer.domElement.addEventListener('click', handleClick)

    sceneRef.current = scene
    rendererRef.current = renderer
    globeRef.current = globe

    return () => {
      if (mountRef.current && renderer.domElement) {
        renderer.domElement.removeEventListener('click', handleClick)
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [stories, selectedCountry, onCountryClick, isClient])

  if (!isClient) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-[200px] h-[200px] bg-slate-100 rounded-lg animate-pulse"></div>
        <p className="text-xs text-slate-500 mt-2">Loading Globe...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div ref={mountRef} className="cursor-pointer" />
      <p className="text-xs text-slate-500 mt-2">Interactive Globe</p>
    </div>
  )
}
