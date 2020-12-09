import { useEffect, useRef } from 'react';

export function useEffectOnUpdate(cb: () => void, dependencies: any[]) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      console.log('didmont');
      cb();
    } else {
      console.log('monting');
      didMount.current = true;
    }
  }, dependencies);
}
