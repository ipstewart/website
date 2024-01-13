import { CallbackResponse, ProgressCallbackResponse } from './Scroller';

interface OverlayProps {
  content: string;
  children?: JSX.Element[] | JSX.Element;
  onStepEnter?: ({ element, data, direction }: CallbackResponse) => unknown;
  onStepProgress?: ({ element, data, progress }: ProgressCallbackResponse) => unknown;
  onStepExit?: ({ element, data, direction }: CallbackResponse) => unknown;
}

const ScrollerOverlay = (props: OverlayProps) => {
  return <div style={{ minHeight: '100vh' }}>{props.children}</div>;
};

export default ScrollerOverlay;
