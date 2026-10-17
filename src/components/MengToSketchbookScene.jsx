import React from 'react';
import { MengToSketchbookLandingPage } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';

export function Scene() {
  return (
    <div className="shader-frame w-full min-h-screen">
      <MengToSketchbookLandingPage
        headingFont="instrument-serif"
        bodyFont="newsreader"
        headingWeight="400"
        bodyWeight="400"
        primaryColor="#2b2721"
        headingSize={30}
        bodySize={20}
        headingLetterSpacing={0.010}
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
}

export default Scene;
