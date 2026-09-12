import React from "react"

const LoadingSpinner: React.FC = () => {
  return (
    <>
      <div className="spinner-overlay">
        <div className="spinner"></div>
        <div className="loading-text">
          <img src="public/assets/launchericon-48x48.png" className="" />
          <p>loading...</p>
        </div>
      </div>
    </>
  )
}

export default LoadingSpinner
