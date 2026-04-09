"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function AnimatedTextureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let width = container.clientWidth
    let height = container.clientHeight

    const gu = { time: { value: 0 } }
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
    })
    material.defines = { USE_UV: "" }

    material.onBeforeCompile = (shader) => {
      shader.uniforms.time = gu.time
      shader.fragmentShader = `
        uniform float time;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
        float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);float a=hash(i);float b=hash(i+vec2(1.,0.));float c=hash(i+vec2(0.,1.));float d=hash(i+vec2(1.,1.));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
        float fbm(vec2 p) {
            float v=0.,a=0.5;
            for (int i=0;i<3;i++){v+=a*noise(p);p*=2.;a*=0.5;}
            return v;
        }
        ${shader.fragmentShader}
      `.replace(
        `#include <color_fragment>`,
        `#include <color_fragment>
        
        // Darker green for the background/base
        vec3 baseColor = vec3(0.102, 0.122, 0.102); // #1a1f1a roughly
        // Slightly lighter dark green for the lines
        vec3 lineColor = vec3(0.141, 0.169, 0.133); // darker muted green

        vec2 distortionField = vUv * 1.5;
        float distortion = fbm(distortionField + time * 0.15);
        float distortionStrength = 0.4;

        vec2 uv = vUv * 1.8;
        vec2 warpedUv = uv + (distortion - 0.5) * distortionStrength;
        float n = fbm(warpedUv);

        float linePattern = fract(n * 8.0);
        // Make the transition sharper for clearer lines
        float lineMix = 1.0 - smoothstep(0.48, 0.52, linePattern);

        // Mix the two dark green colors based on the pattern
        diffuseColor.rgb = mix(baseColor, lineColor, lineMix);
        diffuseColor.a = 1.0; // Full opacity
        `,
      )
    }

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material)
    scene.add(plane)

    const clock = new THREE.Clock()
    let animationFrameId: number
    const animate = () => {
      gu.time.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      camera.left = -width / 2
      camera.right = width / 2
      camera.top = height / 2
      camera.bottom = -height / 2
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      plane.geometry.dispose()
      plane.geometry = new THREE.PlaneGeometry(width, height)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
