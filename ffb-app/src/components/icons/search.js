export function IconSearch({ active }) {
  return (
    <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`icon-search${active ? " icon-search--active" : ""}`}>
      <path
        d="M11.835 10.375L9.498 8.038a.562.562 0 00-.398-.164h-.382A4.874 4.874 0 004.875 0 4.874 4.874 0 000 4.875a4.874 4.874 0 007.874 3.843V9.1c0 .15.059.293.164.398l2.337 2.337c.22.22.576.22.794 0l.663-.663c.22-.22.22-.577.003-.797zm-6.96-2.5c-1.657 0-3-1.341-3-3 0-1.657 1.34-3 3-3 1.656 0 3 1.34 3 3 0 1.656-1.341 3-3 3z"
        fill="#00214D"
      />
    </svg>
  );
}
