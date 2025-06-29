"use client"
import React, { useRef, useEffect } from 'react';

const DNAViewer: React.FC = () => {
    const container = useRef<HTMLDivElement | null>(null);
    const viewer = useRef<any>(null);

    useEffect(() => {
        if (!container.current) return;

        import('3dmol/build/3Dmol.js').then(($3Dmol: any) => {
            viewer.current = $3Dmol.createViewer(container.current, {
                backgroundColor: '#232526', // Use a solid color for 3Dmol.js
                lowerZoomLimit: 10,
                upperZoomLimit: 500,
            });

            $3Dmol.download('pdb:1BNA', viewer.current, {}, function() {
                viewer.current.setStyle({}, {
                    cartoon: {
                        color: 'spectrum',
                        ribbon: true,
                        arrows: false,
                        opacity: 1.0,
                        thickness: 2.5,
                        smooth: true
                    }
                });
                viewer.current.zoomTo();
                viewer.current.render();
                // Start animation: slow rotation
                viewer.current.spin("y", 1); // 1 degree per frame
            });
        });

        return () => {
            if (viewer.current) {
                viewer.current.spin(false); // stop spinning
                viewer.current.clear();
                viewer.current = null;
            }
        };
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #232526 0%, #414345 100%)', // Gradient for the page
        }}>
            <div
                ref={container}
                style={{
                    width: '600px',
                    height: '600px',
                    borderRadius: '32px',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(44, 62, 80, 0.95)',
                    overflow: 'hidden',
                }}
            />
        </div>
    );
};

export default DNAViewer; 