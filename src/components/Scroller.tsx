import React, { useEffect, useState } from 'react';
// @ts-expect-error no types defined for react-scrollama
import { Scrollama, Step } from 'react-scrollama';

export interface CallbackResponse {
  element: HTMLElement;
  data: number;
  direction: 'up' | 'down';
}

export interface ProgressCallbackResponse {
  element: HTMLElement;
  data: number;
  progress: number;
}

interface ScrollerProps {
  children: JSX.Element[];
  onStepEnter?: ({ element, data, direction }: CallbackResponse) => unknown;
  onStepProgress?: ({ element, data, progress }: ProgressCallbackResponse) => unknown;
  onStepExit?: ({ element, data, direction }: CallbackResponse) => unknown;
}

const Scroller = ({ children, ...props }: ScrollerProps) => {
  const [overlays, setOverlays] = useState<JSX.Element[]>([]);
  const [currentOverlayIndex, setCurrentOverlayIndex] = useState<number>(0);
  const [currentBackgroundName, setCurrentBackgroundName] = useState<string | null>(null);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStepEnter = ({ element, data, direction }: CallbackResponse) => {
    const overlay = overlays[data];

    if (props.onStepEnter) {
      props.onStepEnter({ element, data, direction });
    }

    if (overlay.props.onStepEnter) {
      overlay.props.onStepEnter({ element, data, direction });
    }

    if (overlay) {
      setCurrentBackgroundName(overlay.props.content);
    }

    setCurrentOverlayIndex(data);
  };

  const onStepExit = ({ element, data, direction }: CallbackResponse) => {
    const overlay = overlays[data];

    if (props.onStepExit) {
      props.onStepExit({ element, data, direction });
    }

    if (overlay.props.onStepExit) {
      overlay.props.onStepExit({ element, data, direction });
    }
  };

  const onStepProgress = ({ element, data, progress }: ProgressCallbackResponse) => {
    const overlay = overlays[data];

    if (props.onStepProgress) {
      props.onStepProgress({ element, data, progress });
    }

    if (overlay.props.onStepProgress) {
      overlay.props.onStepProgress({ element, data, progress });
    }
  };

  const init = () => {
    const backgrounds: { [key: string]: JSX.Element } = {};
    const overlays: JSX.Element[] = [];

    React.Children.map(children, (element) => {
      if (element.props['data-name']) {
        backgrounds[element.props['data-name']] = element;
      } else if (element.props.content) {
        overlays.push(element);
      }
    });

    setCurrentBackgroundName(Object.keys(backgrounds)[0]);
    setOverlays(overlays);
  };

  return (
    <div style={{ display: 'block', position: 'relative', width: '100%' }}>
      <div
        style={{
          position: 'sticky',
          top: 64,
          display: 'block',
          minHeight: 'calc(100vh - 64px)',
          overflow: 'hidden',
        }}>
        {children
          .filter((child) => child.props['data-name'])
          .map((background) => (
            <div
              key={background.props['data-name']}
              style={{
                width: '100%',
                height: 'calc(100vh - 64px)',
                margin: '0 auto',
                display: background.props['data-name'] === currentBackgroundName ? 'block' : 'none',
              }}>
              {background}
            </div>
          ))}
      </div>
      <div
        style={{
          display: 'block',
          width: '100%',
          marginTop: '-100vh',
          transform: 'translate3d(0, 0, 0)',
          pointerEvents: 'none',
        }}>
        <Scrollama
          offset={0.5}
          threshold={1}
          onStepEnter={onStepEnter}
          onStepExit={onStepExit}
          onStepProgress={onStepProgress}>
          {overlays.map((overlay, index) => (
            <Step data={index} key={index}>
              <div style={{ opacity: currentOverlayIndex === index ? 1 : 0.2 }}>{overlay}</div>
            </Step>
          ))}
        </Scrollama>
      </div>
    </div>
  );
};

export default Scroller;
