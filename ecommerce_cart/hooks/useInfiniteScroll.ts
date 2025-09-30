import { useEffect } from 'react';


export function useInfiniteScroll(handler: () => void, enabled = true) {
useEffect(() => {
if (!enabled) return;
const onScroll = () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 600) {
handler();
}
};
window.addEventListener('scroll', onScroll);
return () => window.removeEventListener('scroll', onScroll);
}, [handler, enabled]);
}