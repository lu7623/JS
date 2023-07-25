export default function disablePrevNext(param: { prev:boolean, next:boolean, section: 'garage' | 'winners' }) {
  const prevBtn = document.querySelector(`.prev-${param.section}`) as HTMLButtonElement;
  if (prevBtn) prevBtn.disabled = param.prev;
  const nextBtn = document.querySelector(`.next-${param.section}`) as HTMLButtonElement;
  nextBtn.disabled = param.next;
}

export function paginationBtns(param: { maxPage: number, currentPage: number }, section:'garage' | 'winners') {
  if (param.maxPage > 1) {
    if (param.currentPage === 0) {
      disablePrevNext({ prev: true, next: false, section });
    } else if (param.currentPage < param.maxPage - 1) {
      disablePrevNext({ prev: false, next: false, section });
    } else disablePrevNext({ prev: false, next: true, section });
  } else {
    disablePrevNext({ prev: true, next: true, section });
  }
}
