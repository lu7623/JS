export default function disablePrevNext(param: { prev:boolean, next:boolean }) {
  const prevBtn = document.querySelector('.prev') as HTMLButtonElement;
  if (prevBtn) prevBtn.disabled = param.prev;
  const nextBtn = document.querySelector('.next') as HTMLButtonElement;
  nextBtn.disabled = param.next;
}
