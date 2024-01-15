// import { useEffect, useRef } from 'react';
// import tippy from 'tippy.js';

// interface TooltipProps {
//   content: string;
// }

// function Tooltip({ content }: Readonly<TooltipProps>) {
// 	const tooltipRef = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		if (tooltipRef.current) {
// 			tippy(tooltipRef.current, {
// 				content,
// 				arrow: true,
// 				placement: 'top',
// 			});
// 		}
// 	}, [content]);

// 	return <div ref={tooltipRef}></div>;
// };

// export default Tooltip;
