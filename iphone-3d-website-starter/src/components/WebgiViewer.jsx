import React, {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";

import {
  ViewerApp,
  TonemapPlugin,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  GammaCorrectionPlugin,
  SSRPlugin,
  BloomPlugin,
  mobileAndTabletCheck,
} from "webgi";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation";

gsap.registerPlugin(ScrollTrigger);

const WebgiViewer = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [viewerRef, setViewerRef] = useState(null);
  const [targetRef, setTargetRef] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [positionRef, setPositionRef] = useState(null);
  const canvasContainerRef = useRef(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  useImperativeHandle(ref, () => ({
    triggerPreview() {
      setPreviewMode(true);
      canvasContainerRef.current.style.pointerEvents = "all";
      props.contentRef.current.style.opacity = "0";

      gsap.to(positionRef, {
        x: 13.04,
        y: -2.01,
        z: 2.29,
        duration: 2,
        onUpdate: () => {
          viewerRef.setDirty();
          cameraRef.positionTargetUpdated(true);
        },
      });
      gsap.to(targetRef, {
        x: 0.11,
        y: 0.0,
        z: 0.0,
        duration: 2,
      });

      gsap.to(targetRef, {
        x: 0.11,
        y: 0.0,
        z: 0.0,
        duration: 2,
      });
      viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true });
    },
  }));

  const memoizedScrollAnimation = useCallback((position, target, isMobile, onUpdate) => {
    if (position && target && onUpdate) {
      scrollAnimation(position, target, isMobile, onUpdate);
    }
  }, []);

  const setupViewer = useCallback(async () => {
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    setViewerRef(viewer)
   const isMobileOrTablet = mobileAndTabletCheck()
   setIsMobile(isMobileOrTablet)

    const manager = await viewer.addPlugin(AssetManagerPlugin);

    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;

    setCameraRef(camera);
    setPositionRef(position);
    setTargetRef(target);

    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(true));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(BloomPlugin);

    viewer.renderer.refreshPipeline();

    try {
      await manager.addFromPath("/scene-black.glb");
      console.log("Successfully loaded scene-black.glb");
    } catch (error) {
      console.error("Error loading scene-black.glb:", error);
      // Try alternative file if available
      try {
        await manager.addFromPath("/scene.glb");
        console.log("Successfully loaded scene.glb as fallback");
      } catch (fallbackError) {
        console.error("Error loading fallback scene.glb:", fallbackError);
      }
    }

    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

    // Enable camera controls for animation
    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

    if(isMobileOrTablet){
      position.set(-16.7, 1.17, 11.7)
      target.set(0, 1.37, 0)
      props.contentRef.current.className = "mobile-or-tablet"
    }

    let needsUpdate = true;
    window.scrollTo(0, 0);

    const onUpdate = () => {
      needsUpdate = true;
      viewer.setDirty();
    };

    viewer.addEventListener("preFrame", () => {
      if (needsUpdate) {
        camera.positionTargetUpdated(true);
        needsUpdate = false;
      }
    });

    // Start scroll animation after everything is set up
    memoizedScrollAnimation(position, target, isMobileOrTablet, onUpdate);
  }, []);

  useEffect(() => {
    setupViewer();
  }, []);

  const handleExit = useCallback(() => {
    canvasContainerRef.current.style.pointerEvents = "all";
    props.contentRef.current.style.opacity = "0";
    viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
    setPreviewMode(false);


    gsap.to(positionRef, {
      x: !isMobile ? 1.56 : 9.36,
      y: !isMobile ? 5.0 : 10.95,
      z: !isMobile ? 0.01 : 0.09,
      scrollTrigger: {
          trigger: ".display-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
      },
      onUpdate: ()=>{
        viewerRef.setDirty();
        cameraRef.positionTargetUpdated(true);
      }
  });
  
  gsap.to(targetRef, {
    x: !isMobile ? -0.55 : -1.62,
    y: !isMobile ? 0.32 : 0.02,
    z: !isMobile ? 0.0 : -0.06,
    scrollTrigger: {
          trigger: ".display-section",
          start: "top bottom",
          end: "top top",
          scrub: 2,
          immediateRender: false,
      },
  })

  }, [canvasContainerRef, viewerRef, positionRef, cameraRef, targetRef]);

  return (
    <div ref={canvasContainerRef} id="webgi-convas-container">
      <canvas id="webgi-canvas" ref={canvasRef}>
        {previewMode && (
          <button className="button" onClick={handleExit}>
            Exit
          </button>
        )}
      </canvas>
    </div>
  );
});

export default WebgiViewer;
