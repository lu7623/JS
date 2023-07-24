export default function disablePrevNext(param: { prev:boolean, next:boolean }) {
  const prevBtn = document.querySelector('.prev') as HTMLButtonElement;
  if (prevBtn) prevBtn.disabled = param.prev;
  const nextBtn = document.querySelector('.next') as HTMLButtonElement;
  nextBtn.disabled = param.next;
}

export function paginationBtns(param: { maxPage: number, currentPage: number }) {
  if (param.maxPage > 1) {
    if (param.currentPage === 0) {
      disablePrevNext({ prev: true, next: false });
    } else if (param.currentPage < param.maxPage - 1) {
      disablePrevNext({ prev: false, next: false });
    } else disablePrevNext({ prev: false, next: true });
  } else {
    disablePrevNext({ prev: true, next: true });
  }
}