const CheckSW = () => {
  return (
    <button
      onClick={() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(regs => {
            console.log('Service Workers:', regs)
            alert(`${regs.length} service worker(s) registered`)
          })
        }
      }}
    >
      Check Service Workers
    </button>
  )
}
