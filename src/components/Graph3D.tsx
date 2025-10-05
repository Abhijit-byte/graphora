import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type GraphType = 'line' | 'bar' | 'surface';
type MetricType = 'revenue' | 'users' | 'performance';

export default function Graph3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [graphType, setGraphType] = useState<GraphType>('line');
  const [metric, setMetric] = useState<MetricType>('revenue');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    dataPoints: THREE.Group;
    animationId?: number;
  }>();

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDarkMode ? 0x0b0f19 : 0xf8fafc);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const gridHelper = new THREE.GridHelper(40, 20, 0x8b5cf6, 0x1a1f35);
    scene.add(gridHelper);

    const dataPoints = new THREE.Group();
    scene.add(dataPoints);

    sceneRef.current = { scene, camera, renderer, dataPoints };

    updateGraph();

    let angle = 0;
    function animate() {
      if (!sceneRef.current) return;
      angle += 0.005;
      sceneRef.current.camera.position.x = Math.sin(angle) * 30;
      sceneRef.current.camera.position.z = Math.cos(angle) * 30;
      sceneRef.current.camera.lookAt(0, 0, 0);
      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    }
    animate();

    const interval = setInterval(() => {
      updateGraph();
    }, 2000);

    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && sceneRef.current?.renderer.domElement) {
        containerRef.current.removeChild(sceneRef.current.renderer.domElement);
      }
      sceneRef.current?.renderer.dispose();
    };
  }, [isDarkMode]);

  useEffect(() => {
    updateGraph();
  }, [graphType, metric]);

  const generateData = () => {
    const data: number[] = [];
    for (let i = 0; i < 12; i++) {
      data.push(Math.random() * 20 + 5);
    }
    return data;
  };

  const updateGraph = () => {
    if (!sceneRef.current) return;

    while (sceneRef.current.dataPoints.children.length > 0) {
      sceneRef.current.dataPoints.remove(sceneRef.current.dataPoints.children[0]);
    }

    const data = generateData();

    if (graphType === 'line') {
      const points: THREE.Vector3[] = [];
      data.forEach((value, index) => {
        points.push(new THREE.Vector3((index - 5.5) * 3, value, 0));
      });

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0x8b5cf6, linewidth: 2 });
      const line = new THREE.Line(geometry, material);
      sceneRef.current.dataPoints.add(line);

      points.forEach((point) => {
        const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x00f5d4, emissive: 0x00f5d4, emissiveIntensity: 0.5 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.copy(point);
        sceneRef.current!.dataPoints.add(sphere);
      });
    } else if (graphType === 'bar') {
      data.forEach((value, index) => {
        const geometry = new THREE.BoxGeometry(2, value, 2);
        const material = new THREE.MeshPhongMaterial({
          color: 0x8b5cf6,
          emissive: 0x8b5cf6,
          emissiveIntensity: 0.3,
        });
        const bar = new THREE.Mesh(geometry, material);
        bar.position.set((index - 5.5) * 3, value / 2, 0);
        sceneRef.current!.dataPoints.add(bar);
      });
    } else if (graphType === 'surface') {
      const size = 8;
      const segments = 20;
      const geometry = new THREE.PlaneGeometry(size * 4, size * 4, segments, segments);
      const positions = geometry.attributes.position;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 5;
        positions.setZ(i, z);
      }

      geometry.computeVertexNormals();

      const material = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.2,
        wireframe: true,
      });

      const surface = new THREE.Mesh(geometry, material);
      surface.rotation.x = -Math.PI / 4;
      sceneRef.current!.dataPoints.add(surface);
    }
  };

  return (
    <section id="dashboard" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#8b5cf6] to-[#00f5d4] bg-clip-text text-transparent">
            Real-Time 3D Analytics
          </h2>
          <p className="text-xl text-gray-400">Watch your data come to life with interactive 3D visualizations</p>
        </div>

        <div className="glass rounded-2xl p-8 glow-blue">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold mb-2 text-gray-300">Graph Type</label>
              <select
                value={graphType}
                onChange={(e) => setGraphType(e.target.value as GraphType)}
                className="w-full bg-[#1a1f35] border border-[#8b5cf6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] transition"
              >
                <option value="line">Line Graph</option>
                <option value="bar">Bar Chart</option>
                <option value="surface">Surface Plot</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold mb-2 text-gray-300">Metric</label>
              <select
                value={metric}
                onChange={(e) => setMetric(e.target.value as MetricType)}
                className="w-full bg-[#1a1f35] border border-[#8b5cf6] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] transition"
              >
                <option value="revenue">Revenue</option>
                <option value="users">Users</option>
                <option value="performance">Performance</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold mb-2 text-gray-300">Theme</label>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#00f5d4] rounded-lg px-4 py-2 font-semibold hover:shadow-lg transition"
              >
                {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
              </button>
            </div>
          </div>

          <div ref={containerRef} className="canvas-container glass" />

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Graph updates every 2 seconds with simulated real-time data</p>
          </div>
        </div>
      </div>
    </section>
  );
}
